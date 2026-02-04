import React from 'react'; // Correct import
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Addemployee from './pages/Addemployee';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addemployee" element={<Addemployee />} />
    </Routes>
  );
}

export default App;
