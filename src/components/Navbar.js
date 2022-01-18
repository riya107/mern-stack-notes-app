import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate=useNavigate()

    const context=useContext(NoteContext)
    const {logged,setTrue,setFalse}=context

    function wrapper(){
        navigate('/login')
        setFalse()
    }
    return (
        <nav>
        <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <div id="btns">
            {!logged && <Link to='/login' id="login">Login</Link>}
            {!logged && <Link to='/signup' id="signup">Sign Up</Link>}
            {logged && <button onClick={wrapper}>Log Out</button>}
        </div>
        </ul>
        </nav>
    )
}
