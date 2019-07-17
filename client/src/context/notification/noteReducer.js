import * as types from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.NOTES_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_NOTES:
      return {
        loading: false,
        noteList: action.payload
      };
    case types.DELETE_NOTE:
      return {
        loading: false,
        noteList: state.noteList.filter(note => note.id !== action.payload)
      };
    default:
      return {
        ...state
      };
  }
};
