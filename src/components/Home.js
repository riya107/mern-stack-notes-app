import React, { useContext, useEffect, useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import "../styles/Home.css";
import Form from "../components/Form"
import EditForm from "./EditForm";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate=useNavigate()

  const context = useContext(NoteContext);
  const { notes, setNotes , fetchallnotes} = context;
  const [_id,set_id]=useState(null)
  const [disp,setDisp]=useState({
    display:"none"
  })

  function closeOpenFun(_id){
    setDisp({display:"block"})
    set_id(_id)
  }

  function closeFun(){
    setDisp({display:"none"})     
  }


  useEffect(()=>{
  if(localStorage.getItem('token')){
    fetchallnotes()
  }
  else{
    navigate('/login')
  }
  },[])

  return (
    <div>
      <h1>Add Notes</h1>
      <Form/>
      <EditForm disp={disp} closeFun={closeFun} _id={_id}/>
      <h1>Your Notes</h1>
      <div className="container">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} closeOpenFun={closeOpenFun}/>;
        })}
      </div>
    </div>
  );
}