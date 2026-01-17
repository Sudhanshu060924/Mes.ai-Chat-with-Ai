import React from 'react'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp';
import usegetcurrentUser from './customhooks/getcurrentUser';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';
import getotheruser from './customhooks/getotherUser';

function App() {
  usegetcurrentUser()
  getotheruser()
  const {userData}= useSelector((state)=>state.user)
  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/profile" />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App
