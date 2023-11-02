import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { AddNote } from "./AddNote";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
export const Notes = () => {
  const context = useContext(noteContext);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const { notes, getNotes,addNote,editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote.id,etitile:currentNote.title, edescription:currentNote.description,etag:currentNote.tag});
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick=(e)=>{
    e.preventDefault();
      addNote(note.title,note.description,note.tag)
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
    editNote(note.id,note.title,note.description,note.tag);
    refClose.current.click();
  }

  return (
    <>
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form className="my-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  value={note.edescription}
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  value={note.etag}
                  className="form-control"
                  id="etag"
                  name="etag"
                  onChange={onChange}
                />
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row my-3">
          <h1>You Notes</h1>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                note={note}
              ></NoteItem>
            );
          })}
        </div>
      </div>
    </>
  );
};
