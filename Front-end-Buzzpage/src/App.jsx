import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import HiveFeed from './components/HiveFeed/HiveFeed';
import NavBar from './components/NavBar/NavBar';
import PostForm from './components/PostForm/PostForm';
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
  const [posts, setPosts] = useState([postService.index()]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }
  const handleAddPost = async (postData) => {
    const newPost = await postService.create(postData)
    setPosts([...posts, newPost])
  }
 

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        <Route path="/" element={<HiveFeed />} />
        <Route path="/news" element={<NewsSlider />} />
        <Route path="/users/signup" element={<SignUpForm setUser={setUser} />} />
        <Route path="/users/signin" element={<SignInForm setUser={setUser} />} />
        <Route path="/users/profile/:userId" element={<UserPage />} />
        <Route path="/posts" element={<PostForm handleAddPost={handleAddPost} />} />
      </Routes>
    </>

  )
};

export default App;