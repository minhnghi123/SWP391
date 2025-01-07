import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '../pages/homePage'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>


    </>
  )
}

export default App
