import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import "./Styling/Form.css";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    // isPublic: "",
  });

  const [isPublic, setPublic] = useState("false")

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, isPublic.isPublic);
    setNote({ title: "", description: "", tag: "" });
    setPublic("true")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    
  };

  const publicOnChange = (x) =>{
    setPublic([x.target.name] = x.target.checked);
  }

  return (
    <div className="container" style={{ height: "350px" }}>
      <h2> Add a Note </h2>

      <form>
        <div className="inp">
          <label htmlFor="title"> Title </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
          />
        </div>

        <div className="textArea">
          <label htmlFor="description"> Description </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>

        <div className="inp">
          <label htmlFor="tag"> Tag </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <div className="inp">
          <label htmlFor="isPublic"> Public </label>
          True
          <input
            type="checkbox"
            name="isPublic"
            value="true"
            checked={isPublic.isPublic}
            onChange={publicOnChange}
          />
        </div>


        <button
          className="btn"
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
