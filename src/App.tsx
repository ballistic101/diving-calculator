import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './routes/home/Home';
import Basic from './routes/basic/Basic';
import DiveTypes from './routes/dive-types/DiveTypes';
import NoMatch from './routes/no-match/NoMatch';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';
import Footer from './components/Footer';
import './App.css'

function App() {

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Header onMenuClick={() => setMenuOpen(!isMenuOpen)} />
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/dive-types" element={<DiveTypes />} />  
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App