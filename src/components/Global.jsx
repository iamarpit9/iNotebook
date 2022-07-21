import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";

const Global = () => {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAllNotes();
    } else {
      navigate("/login");
    }
  });

  return (
    <div>
      <div className="row">
        {notes.length === 0 && "No notes to display!"}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Global;
