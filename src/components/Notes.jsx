import React, { useContext, useEffect, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import "./Styling/Card.css";
import "./Styling/Modal.css";

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigate("/login");
    }
  });

  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "",
  });

  const [modal, setModal] = useState(false);

  const toggleModal = (currentNote) => {
    setModal(!modal);
    setNote({
      id: currentNote._id,
      editTitle: currentNote.title,
      editDescription: currentNote.description,
      editTag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.editTitle, note.editDescription, note.editTag);
    setModal(!modal);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote />

      <h2 className="heading2">Your Notes</h2>
      <div className="row">
        {notes.length === 0 && "No notes to display!"}
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} toggleModal={toggleModal} />
          );
        })}
      </div>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <span class="close" onClick={toggleModal}>
                &times;
              </span>
              <h2>Edit Note</h2>
              <form>
                <div className="inp">
                  <label htmlFor="editTitle"> Title </label>
                  <input
                    type="text"
                    id="editTitle"
                    name="editTitle"
                    value={note.editTitle}
                    onChange={onChange}
                  />
                </div>

                <div className="textArea">
                  <label htmlFor="editDescription"> Description </label>
                  <textarea
                    type="text"
                    id="editDescription"
                    name="editDescription"
                    value={note.editDescription}
                    onChange={onChange}
                  />
                </div>

                <div className="inp">
                  <label htmlFor="editTag"> Tag </label>
                  <input
                    type="text"
                    id="editTag"
                    name="editTag"
                    value={note.editTag}
                    onChange={onChange}
                  />
                </div>
              </form>

              <div className="buttons">
                <button className="btn" onClick={toggleModal}>
                  Close
                </button>
                <button
                  disabled={
                    note.editTitle.length < 5 || note.editDescription.length < 5
                  }
                  className="btn"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
