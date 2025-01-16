import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '../pages/homePage'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage'
import PaymentPage from '../pages/paymentPage'
import Test from '../components/test'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>


    </>
  )
}

export default App
