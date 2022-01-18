import React,{useContext} from 'react'
import '../styles/NoteItem.css'
import NoteContext from '../context/notes/NoteContext'

export default function NoteItem(props) {
    const context=useContext(NoteContext)
    
    const {delNote}=context

    function delNoteWrap(){
        delNote(props.note._id)
    }

    function updatenote(){
       props.closeOpenFun(props.note._id)
    }

    return (
        <div className='card'>
            <h2>{props.note.title}</h2>
            <h3>{props.note.tag}</h3>
            <p>{props.note.description}</p>
            <i className="fas fa-trash-alt" onClick={delNoteWrap}></i>
            <i className="fas fa-edit" onClick={updatenote}></i>
        </div>
    )
}