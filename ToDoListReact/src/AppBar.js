import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useNavigate } from "react-router"
import { createSvgIcon } from '@mui/material/utils';
import { useLocation } from 'react-router-dom';

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
export default function ButtonAppBar() {
  const i = 2
  const location = useLocation()
  let nav = useNavigate()
  const [message, setMessage] = useState('');
  let title;
  switch (location.pathname) {
    case '/':
      title = "היי, בא לנהל את המשימות שלך :)"; break;
     case '/Login':
        title = "התחברות"; break;
    case '/Register':
      title = "הרשמה"; break;

    case '/Tasks':
      title = "משימות"; break;


  }
  
  const toLogin = () => {
    nav("/Login");

  }
  const toRegister = () => {
    nav('/Register')

  }
  const toTask = () => {
    nav('/Tasks')

  }
  const toLogOut = () => {
    nav('/')
  }
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="absolute">
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
         
          
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign:"center"}}>
            {title}
          </Typography>
          <Button color="inherit" onClick={toTask}>המשימות שלי</Button>
          <Button color="inherit" onClick={toRegister} >  הרשמה </Button>
          <Button color="inherit" onClick={toLogin}>התחברות</Button>
         
      
          <HomeIcon sx={{ fontSize: 60 }} onClick={() => { nav("/") }} />
          {/* </Fab> */}
          {/* {userName.userName&& <p>{userName.userName}</p>} */}
          <br /><br /><br /><br /><br /><br />
        </Toolbar>

      </AppBar>

    </Box>
  );
}
