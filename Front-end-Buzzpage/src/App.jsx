import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm';
/*--------------------services--------------- */
import * as authService from './services/authService';
import * as postService from './services/postService';


const App = () => {
  return(
    <>
      <SignUpForm/>
    </>

  ) 
};

export default App;