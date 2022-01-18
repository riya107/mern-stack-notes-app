import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

export default function Signup() {

    const context=useContext(NoteContext)
    const {logged,setTrue,setFalse}=context
    const navigate=useNavigate()

    const [credentials,setCredentials]=useState({
        name:"",
        email:"",
        password:""
    })

    function onChange(e){
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    function signup(e){
        e.preventDefault()
        fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
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
                  console.log(data)
                  alert('Invalid Credentials')
              }
            });
    }

    return (
        <form action=""  onSubmit={signup}>
            <div>
                <label htmlFor="sign_name">Name</label>
                <input type="text" onChange={onChange} value={credentials.name} id="sign_name" name='name' minLength={3}/>
            </div>
            <div>
                <label htmlFor="sign_email">Email</label>
                <input type="email" onChange={onChange} value={credentials.email} id="sign_email" name='email'/>
            </div>
            <div>
                <label htmlFor="sign_password">Password</label>
                <input type="password" onChange={onChange} value={credentials.password} id="sign_password" name='password' minLength={3}/>
            </div>
            <input type="submit" value='Sign Up'/>
        </form>
    )
}
