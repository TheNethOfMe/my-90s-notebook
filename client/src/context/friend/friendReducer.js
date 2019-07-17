import * as types from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.FRIENDS_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_FRIENDS:
      return {
        ...state,
        mutualFriends: action.payload.mutual,
        requestsYouSent: action.payload.sent,
        requestsTheySent: action.payload.recieved,
        loading: false
      };
    case types.CREATE_REQUEST:
      return {
        ...state,
        requestsYouSent: state.requestsYouSent.push(action.payload),
        loading: false
      };
    case types.ACCEPT_REQUEST:
      return {
        ...state,
        requestsTheySent: state.requestsTheySent.filter(
          friend => friend.friendUserId !== action.payload.friendUserId
        ),
        mutualFriends: state.mutualFriends.push(action.payload),
        loading: false
      };
    case types.REJECT_REQUEST:
      return {
        ...state,
        requestsTheySent: state.requestsTheySent.filter(
          friend => friend.friendUserId !== action.payload
        ),
        loading: false
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        requestsTheySent: state.requestsTheySent.filter(
          friend => friend.id !== action.playload
        ),
        loading: false
      };
    case types.SEARCH_NAME:
      return {
        ...state,
        searchResults: action.payload,
        loading: false
      };
    case types.SEARCH_EMAIL:
      return {
        ...state,
        searchResults: [action.payload],
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};
