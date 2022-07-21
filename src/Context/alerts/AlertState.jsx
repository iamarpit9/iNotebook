import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
  return (
    <AlertContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
