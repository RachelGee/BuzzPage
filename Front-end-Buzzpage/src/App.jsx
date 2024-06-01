import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import HiveFeed from './components/HiveFeed/HiveFeed';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route, useNavigate } from 'react-router-dom'

/*----------------User components-------------------- */
import UserPage from './components/UserPage/UserPage';

/*--------------------services--------------- */
import * as authService from './services/authService';
import * as postService from './services/postService';
import NewsSlider from './components/NewsSlider/NewsSlider';


const App = () => {

  // need to store user object when they are signed
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }


  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        <Route path="/" element={<HiveFeed />} />
        <Route path="/news" element={<NewsSlider />} />
        <Route path="/users/signup" element={<SignUpForm />} />
        <Route path="/users/signin" element={<SignInForm />} />
        <Route path="/users/profiles/:userId" element={<UserPage />} />
      </Routes>
    </>

  )
};

export default App;