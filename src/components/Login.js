import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

export default function Login() {

  const context=useContext(NoteContext)
  const {logged,setTrue,setFalse}=context

    let navigate=useNavigate()

    const [credentials,setCredentials]=useState({
        email:"",
        password:""
    })

    function onChange(e){
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    function login(e){
        e.preventDefault()
        fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
          })
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              if(data.success){
                setTrue()
                localStorage.setItem('token',data.token)
                navigate('/')
              }
              else{
                  alert('Invalid Credentials')
              }
            });
    }

    return (
        <form action="">
            <div>
                <label htmlFor="login_email">Email</label>
                <input type="email" onChange={onChange} value={credentials.email} id="login_email" name='email'/>
            </div>
            <div>
                <label htmlFor="login_password">Password</label>
                <input type="password" onChange={onChange} value={credentials.password} id="login_password" name='password'/>
            </div>
            <input type="submit" value='Login' onClick={login}/>
        </form>
    )
}
