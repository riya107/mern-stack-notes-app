import React,{useState,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import "../styles/EditForm.css"

export default function EditForm(props) {
    const context=useContext(NoteContext)
    const {editNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    function onChange(e){
        setNote({...note,[e.target.name]:e.target.value})
    }

    function close(){
        props.closeFun()
    }
    
    function onClick(e){
        e.preventDefault()
        if(note.title.length>=3 && note.description.length>=3 && note.tag.length>=3){
            editNote(props._id,note)
            props.closeFun()
        }
        else{
            window.alert('Enter Valid Data...')
        }
    }

    return (
        <form action="" style={props.disp} id="editform">
        <i className="fas fa-window-close" onClick={close}></i>
        <div>
        <label htmlFor="edit_title">Title</label>
          <input id="edit_title" onChange={onChange} name='title' type="text"/>
        </div>
        <div>
        <label htmlFor="edit_description">Description</label>
          <input id="edit_description" onChange={onChange} name='description' type="text"/>
        </div>
        <div>
        <label htmlFor="edit_tag">Tag</label>
          <input id="edit_tag" onChange={onChange} name='tag' type="text" minLength={3}/>
        </div>
        <div>
          <input type="submit"value="Edit Note" onClick={onClick}/>
        </div>
        </form>
    )
}
