import React, { useReducer } from "react";
import axios from "axios";
import NoteContext from "./noteContext";
import noteReducer from "./noteReducer";
import * as types from "../types";

const NoteState = props => {
  const initialState = {
    noteList: [],
    loading: false
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  // load notes
  const loadNotes = async () => {
    dispatch({ type: types.NOTES_LOADING });
    try {
      const notes = await axios.get("/api/notification");
      dispatch({ type: types.GET_NOTES, payload: notes.data });
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 401) {
        console.log("hello");
      }
    }
  };

  // delete note
  const deleteNote = async id => {
    try {
      await axios.delete(`/api/notifiaction/${id}`);
      dispatch({ type: types.DELETE_NOTE, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        noteList: state.noteList,
        loading: state.loading,
        loadNotes,
        deleteNote
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
