import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  let host = "http://localhost:8000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
    // Getting the api
    
    const getNotes=async()=>{
      console.log("start")
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':"application/json",
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZmEwNWQxYTc5ZmZhYjRmYWZhOWYyIn0sImlhdCI6MTY5NzYyMDA2MX0.AkVaWXkPpjmg8qVUyGtvA0NEMIOZVqAFDQndxA8CJls",
                'origin':'http://localhost:3000'
            },
           cache:'no-store',
        });
        let json=await response.json();
        console.log(json);
        setNotes(json);
        console.log("end")
    }
  
  
  
  // Adding the notes
  const addNote = async(id,title, description, tag) => {
    //TODO api
    const response=await fetch(`${host}/api/notes/addnote`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZmEwNWQxYTc5ZmZhYjRmYWZhOWYyIn0sImlhdCI6MTY5NzYyMDA2MX0.AkVaWXkPpjmg8qVUyGtvA0NEMIOZVqAFDQndxA8CJls",
        },
        cache:'no-store',
        body:JSON.stringify({title,description,tag})
    })
    // const json=response.json();
    console.log("Adding a new note");

    const note = {
      _id: "652d3f2d5a7bbb71509017999",
      user: "6525730f53e0c6928b8c17eb",
      title: title,
      description: description,
      tag: tag,
      date: "2023-10-16T13:48:29.019Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // delteing the notes
  const deleteNote = (id) => {
    console.log("deleting the id wit" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // }Editing a note
  const editNote = async (id, title, description, tag) => {
    const response =await fetch(
      `${host}/api/notes/updatenote/6527e053d7d926b0c5ae2086/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZmEwNWQxYTc5ZmZhYjRmYWZhOWYyIn0sImlhdCI6MTY5NzYyMDA2MX0.AkVaWXkPpjmg8qVUyGtvA0NEMIOZVqAFDQndxA8CJls",
        },
        body: JSON.stringy({title,description,tag}),
      }
    );
    const json =response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
