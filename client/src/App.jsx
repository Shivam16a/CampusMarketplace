import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import Profile from './Components/Profile';
import Users from './Admin/Users';
import NotFound from './Components/NotFound';
import Layout from './Components/Layout';

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />

        </Route>

        {/* Auth pages without sidebar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App