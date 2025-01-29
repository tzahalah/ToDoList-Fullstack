import { Password } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import service from './service';
import Button from '@mui/material/Button'




const Register = () => {
    let user={
        email:"",
        userName:"",
        password:"",
    }

    return ( 
        <>
         <br/><br/><br/><br/>
        <form>
            <div className="signUp">
            <TextField id="outlined-basic" label="user-name" variant="outlined" onChange={(e)=>{user.userName=e.target.value}}></TextField><br/><br/>
            <TextField id="outlined-basic" label="email" variant="outlined" onChange={(e)=>{user.email=e.target.value}}></TextField><br/><br/>
            <TextField id="outlined-basic" label="password" type="password" variant="outlined" onChange={(e)=>{user.password=e.target.value}}></TextField>
            
            <br/><br/>
            
            <Button onClick={()=>{ service.addUser(user)}}>Sign Up</Button>
            { <Alert severity="success">המשתמש נרשם בהצלחה.</Alert>}
            </div>
        </form>
        
        </>
     );
}
 
export default Register;