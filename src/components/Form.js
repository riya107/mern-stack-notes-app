import React,{useState,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function Form() {
    const context=useContext(NoteContext)
    const {addNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    function onChange(e){
        setNote({...note,[e.target.name]:e.target.value})
    }
    
    function onClick(e){
        e.preventDefault()
        if(note.title.length>=3 && note.description.length>=3 && note.tag.length>=3){
          addNote(note)
          setNote({title:"",description:"",tag:""})
        }
      else{
          window.alert('Enter Valid Data...')
      }
    }
    return (
        <form action="">
        <div>
        <label htmlFor="title">Title</label>
          <input id="title" value={note.title} onChange={onChange} name='title' type="text"/>
        </div>
        <div>
        <label htmlFor="description">Description</label>
          <input id="description" value={note.description} onChange={onChange} name='description' type="text"/>
        </div>
        <div>
        <label htmlFor="tag">Tag</label>
          <input id="tag" value={note.tag} onChange={onChange} name='tag' type="text"/>
        </div>
        <div>
          <input type="submit"value="Add Note" onClick={onClick}/>
        </div>
        </form>
    )
}
