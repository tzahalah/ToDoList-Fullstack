import axios from 'axios';

// יצירת אינסטנס מותאם אישית
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL
 });

// הוספת Interceptor לתפיסת שגיאות
apiClient.interceptors.response.use(
  (response) => {
    // אם התשובה תקינה, מחזירים אותה כמות שהיא
    return response;
  },
  (error) => {
    // רישום השגיאה ללוג (ניתן לשנות בהתאם לצרכים)
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // ניתן לזרוק את השגיאה כדי שהקריאה ל-API תוכל לטפל בה
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  function(response){
    return response;
  },
  function(error){
    if (error.response.status==401)
      return window.location.href="/login";
    return Promise.reject.error;
  }

);

export default apiClient;
