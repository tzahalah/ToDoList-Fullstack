import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import service from './service.js';
import AppBar from './AppBar.js';
import Tasks from './Tasks.js';

function App() {
 

  return (
    <BrowserRouter>
     <AppBar/> 
       {/* <nav>
        <ul>
            <li><Link to='/Login'>Login</Link></li>
            <li><Link to='/Register'>Register</Link></li>
            <li><Link to='/Tasks'>Tasks</Link></li>
            
        </ul> 
     </nav>   */}
     <br/><br/><br/><br/><br/><br/>
   
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path="/Tasks" element={<Tasks />}></Route>
      </Routes>

    </BrowserRouter> 
  );
}

export default App;