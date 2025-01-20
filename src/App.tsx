import { Routes, Route } from 'react-router-dom';
import Home from '@routes/home/Home';
import Basic from '@routes/basic/Basic';
import NoMatch from '@routes/no-match/NoMatch';
import './App.css'

function App() {

  return (
    <>
    <div>Mike was here.</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} /> 
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App