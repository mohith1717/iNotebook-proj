import React,{useContext} from "react";
// import NoteState from "../context/notes/NoteState";

import { Notes } from "./Notes";

export const Home = () => {
  
  return (
    <div className="container">
          <Notes/>
    </div>
  );
};
