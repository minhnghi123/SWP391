import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '../pages/homePage'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage'
import PaymentPage from '../pages/paymentPage'
import Test from '../components/test'
import VariantsPage from '../pages/variantsPage'
import AboutPage from '../pages/aboutPage'
import PageProfile from '../pages/PageProfile'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/variantsPage" element={<VariantsPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/pageProfile/:section" element={<PageProfile />} />
       
       
      </Routes>


    </>
  )
}

export default App
