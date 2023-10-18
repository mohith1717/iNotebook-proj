import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import {AddNote} from "./AddNote";
import { useEffect } from "react";
export const Notes = () => {
  const context = useContext(noteContext);
  const { notes,getNotes } = context;
  useEffect(() => {
    getNotes();
  }, [])
  
  return (
    <>
      <AddNote/>
      <div>
        <div className="row my-3">
          <h1>You Notes</h1>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note}></NoteItem>;
          })}
        </div>
      </div>
    </>
  );
};
