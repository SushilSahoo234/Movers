import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Enterprise from './components/main/Enterprise';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Delivery from './components/main/Delivery';
import Support from './components/main/Support';
import Home from './components/main/Home';
import Result from './components/main/Result';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Delivery/>} path='/delivery'/>
        <Route element={<Enterprise/>}  path='/enterprise'/> 
        <Route element={<Support/>} path='/support' />
        <Route element={<Result/>} path='/result' />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
