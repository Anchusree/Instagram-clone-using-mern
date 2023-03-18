import React, { useEffect }  from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Mainlayout from './Components/Mainlayout/Mainlayout';
import Home from './Components/Home/Home';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import CreatePost from './Components/CreatePost/CreatePost';
import PrivateRoute from './Utils/PrivateRoute';
import Profile from './Components/Profile/Profile';
import UserProfile from './Components/Profile/UserProfile';
import { getTokenfromLocalStorage } from './Utils/Utils';
import Explore from './Components/Explore/Explore';



function App() {

  //check if user is logined
  useEffect(()=>{

    if(localStorage.getItem("token") && localStorage.getItem("user")){
      <Navigate to="/home"/>
    }
    else{
      <Navigate to="/"/>
    }

  },[getTokenfromLocalStorage]) 


  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/reset/:token" element={<ResetPassword/>}/>

      <Route element={<PrivateRoute/>}>
       <Route element={<Mainlayout/>}>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/createPosts" element={<CreatePost/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route  path='/profile/:userid'  element={<UserProfile/>}/>
        <Route path='/explore' element={<Explore/>}/>
        </Route>
      </Route>
        

        
      </Routes>
     
    </Router>
  );
}

export default App;
