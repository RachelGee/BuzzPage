import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import HiveFeed from './components/HiveFeed/HiveFeed';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route, useNavigate } from 'react-router-dom'

/*----------------User components-------------------- */
import UserPage from './components/UserPage/UserPage';
import UserForm from './components/UserForm/UserForm';

/*--------------------services--------------- */
import * as authService from './services/authService';
import * as postService from './services/postService';
import * as profileService from './services/profileService'

import NewsSlider from './components/NewsSlider/NewsSlider';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }
  
//handle update the user info
const handleUpdateUser = async (userId,formData) =>{
    const updateProfile = await profileService.update(userId,formData);
    setUser(updateProfile);
    navigate(`/users/profile/${user._id}`)
}

//deletes the user account
const handleDeleteUser = async (userId) => {
  const deletedUser = await profileService.deleteUser(userId);
  setUser(null);
  navigate('/')
};

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        <Route path="/" element={<HiveFeed />} />
        <Route path="/news" element={<NewsSlider />} />
        <Route path="/users/signup" element={<SignUpForm setUser={setUser} />} />
        <Route path="/users/signin" element={<SignInForm setUser={setUser} />} />
        <Route path="/users/profile/:userId" element={<UserPage handleDeleteUser={handleDeleteUser}/>} />
        <Route path="/users/profile/:userId/edit" element={<UserForm handleUpdateUser={handleUpdateUser}/>} />
      </Routes>
    </>

  )
};

export default App;