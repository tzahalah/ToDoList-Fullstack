// import { TextField } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import service from './service'
import { Link, BrowserRouter, Routes,Route } from 'react-router-dom'
import { red } from '@mui/material/colors';





const Login = () => {
   console.log('API URL:', process.env.API_URL);
   let nav= useNavigate()
const [message,setMessage]= useState("")
const [show,setShow]=useState("false")
  let user = {
    email:"",
    userName: "",
    password: ""
  }


 
  const checkIsValid = () => {
   
     if ( !service.login(user))
        { setMessage("משתמש לא קיים")
        }
     else 
     nav('/Tasks')
  }

  return ( <>
  <br/><br/><br/><br/>
<TextField required id="outlined-basic" label="user-name" variant="outlined"  onChange={(e)=>user.userName=e.target.value }></TextField><br/><br/>
<TextField required id="outlined-basic" label="email" variant="outlined"  onChange={(e)=>user.email=e.target.value }></TextField><br/><br/>
<TextField required type="password" id="filled-basic" label="password" variant="filled"  onChange={(e)=>user.password=e.target.value}></TextField><br/> 
<Button variant="outlined" onClick={checkIsValid} >Login</Button>
{message}
<br/><br/>
{message=="משתמש לא קיים" &&<Button  variant="outlined"  onClick={()=>{nav("/Register")}} >Sign up</Button>}
 {/* <button onClick={p}></button>  */}

      </> );
}

      export default Login;
