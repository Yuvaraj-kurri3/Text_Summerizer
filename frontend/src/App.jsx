import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './Components/home.jsx'
import LoginPage from './Components/login.jsx'
import SignupPage from './Components/signup.jsx'
import Summarizer from './Components/Summerizerr.jsx'
function App() {
 
 
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/Summarizer" element={<Summarizer />} />
 
      </Routes>
    </BrowserRouter>
   
    
  )
}

export default App;