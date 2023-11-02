import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  let { note ,updateNote} = props;
  return (
    <div className="col-md-3">
      
      
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <div className="d-flex " >
          <i className="fa-solid fa-trash mx-2 btn btn-primary" onClick={()=>{deleteNote(note._id);
          }}></i>
          <i className="fa-solid fa-pen-to-square mx-2 btn btn-primary" onClick={(note)=>{
            updateNote(note);
          }} ></i>
          </div>
          <p className="card-text">

            
            {note.description}
            
          </p>
          <a href="#" className="">
          
            
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
