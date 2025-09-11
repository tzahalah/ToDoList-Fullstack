import apiClient from './apiClient';
function saveAccessToken(authResult){
  localStorage.setItem("access_token", authResult.token);
  setAuthorizationBearer()
}

function setAuthorizationBearer(){
  const accessToken= localStorage.getItem("access_token");
  if(accessToken)
    apiClient.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`;
}


export default {
  getTasks: async () => {
     console.log("Base API URL:", process.env.REACT_APP_API_URL);
    const result = await apiClient.get(`/items`)       
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name);
    const result=await apiClient.post(`/items`,{Name: name, isComplete:false})
    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result= await apiClient.put(`/items/${id}/isComplete?isComplete=${isComplete}`)
    return {};
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result=await apiClient.delete(`/items/${id}`)
  },

  addUser: async(user)=>{
    const result= await apiClient.post(`/users`,user)
    return result.data;
  },
  login : async(user)=>{
    const result= await apiClient.post('/users/login', user)
    saveAccessToken(result.data);
  }


  
  
};
