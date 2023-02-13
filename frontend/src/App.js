import React from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Mainlayout from './Components/Mainlayout/Mainlayout';
import Home from './Components/Home/Home';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import CreatePost from './Components/CreatePost/CreatePost';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/reset/:token" element={<ResetPassword/>}/>

        <Route element={<Mainlayout/>}>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/createPosts" element={<CreatePost/>}/>
        </Route>

        
      </Routes>
     
    </Router>
  );
}

export default App;
