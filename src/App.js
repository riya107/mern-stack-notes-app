import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import NoteState from './context/notes/NoteState'
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react'

function App() {

  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
      </NoteState>
      </>
  );
}

export default App;
