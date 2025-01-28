import { Routes, Route } from 'react-router-dom';
import Home from '@routes/home/Home';
import Basic from '@routes/basic/Basic';
import NoMatch from '@routes/no-match/NoMatch';
import Header from '@components/Header';
import Footer from '@components/Footer';
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} /> 
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App