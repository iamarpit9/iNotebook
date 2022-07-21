import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import "./Styling/Card.css";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, toggleModal } = props;

  return (
    <div className="col">
      <div className="card-body">
          <div className="flex">
            <i
              className="fas fa-trash"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="far fa-edit"
              onClick={() => {
                toggleModal(note);
              }}
            ></i>
          </div>

          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
  
  );
};

export default NoteItem;
