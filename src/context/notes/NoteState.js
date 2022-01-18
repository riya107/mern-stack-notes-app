import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const notesInitial = [];

  const init=(localStorage.getItem('token')==null || localStorage.getItem('token')=='')?false:true
  const [logged,setLogged]=useState(init)

  function setFalse(){
      setLogged(false)
      localStorage.setItem('token','')
  }

  function setTrue(){
      setLogged(true)
  }
  const [notes, setNotes] = useState(notesInitial);

  const fetchallnotes = () => {
    fetch(`${process.env.REACT_APP_HOST}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token:
          localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setNotes(data);
      });
  };

  const addNote = (note) => {
    fetch(`${process.env.REACT_APP_HOST}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token:
          localStorage.getItem('token'),
      },
      body: JSON.stringify(note)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetchallnotes();
      });
  };

  const delNote = (_id) => {
    fetch(`${process.env.REACT_APP_HOST}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token:
          localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetchallnotes();
      });
  };
  const editNote = (_id, note) => {
    fetch(`${process.env.REACT_APP_HOST}/api/notes/updatenote/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token:
          localStorage.getItem('token'),
      },
      body: JSON.stringify(note)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetchallnotes()
      });
  };
  return (
    <NoteContext.Provider
      value={{ notes, delNote, editNote, addNote, fetchallnotes ,logged,setTrue,setFalse}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
