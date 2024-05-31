import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import HiveFeed from './components/HiveFeed/HiveFeed';
import {Routes, Route, useNavigate} from 'react-router-dom'
/*--------------------services--------------- */
import * as authService from './services/authService';
import * as postService from './services/postService';


const App = () => {
  return(
    <>
    <Routes>
      <Route path="/" element={<HiveFeed/>} />
      <Route path="/users/signup" element={<SignUpForm/>} />
      <Route path="/users/signin" element={<SignInForm/>} />
    </Routes>
    </>

  ) 
};

export default App;