import React, { useReducer } from "react";
import axios from "axios";
import FriendContext from "./friendContext";
import friendReducer from "./friendReducer";
import * as types from "../types";

const FriendState = props => {
  const initialState = {
    mutualFriends: [],
    requestsYouSent: [],
    requestsTheySent: [],
    searchResults: [],
    loading: false
  };

  const [state, dispatch] = useReducer(friendReducer, initialState);

  // load friends
  const loadFriends = async () => {
    dispatch({ type: types.FRIENDS_LOADING });
    try {
      const res = await axios.get("/api/friends/");
      const friends = res.data.friends;
      let friendsSorted = {};
      friendsSorted.mutual = friends.filter(
        friend => friend.status === "mutual"
      );
      friendsSorted.sent = friends.filter(friend => friend.status === "sent");
      friendsSorted.recieved = friends.filter(
        friend => friend.status === "recieved"
      );
      dispatch({ type: types.GET_FRIENDS, payload: friendsSorted });
    } catch (err) {
      console.log(err);
    }
  };

  // create friend request
  const createFriendRequest = async recipientId => {
    dispatch({ type: types.FRIENDS_LOADING });
    try {
      console.log(recipientId);
      const newFriendReq = await axios.post("/api/friends", { recipientId });
      dispatch({ type: types.CREATE_REQUEST, payload: newFriendReq });
    } catch (err) {
      console.log(err);
    }
  };

  // update (accept or reject) request
  const updateFriendRequest = async (friendReqObj, update) => {
    dispatch({ type: types.FRIENDS_LOADING });
    try {
      const updateStatus = await axios.put(
        `/api/friends/${friendReqObj.friendUserId}`,
        update
      );
      if (updateStatus.msg === "Update Success" && update === "accept") {
        dispatch({ type: types.ACCEPT_REQUEST, payload: friendReqObj });
      }
      if (updateStatus.msg === "Update Success" && update === "delete") {
        dispatch({
          type: types.REJECT_REQUEST,
          payload: friendReqObj.friendUserId
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // delete a mutual friend
  const deleteFriend = async id => {
    dispatch({ type: types.FRIENDS_LOADING });
    try {
      const deleteStatus = await axios.delete(`/api/friends/${id}`);
      if (deleteStatus.msg === "Delete Successful") {
        dispatch({
          type: types.DELETE_FRIEND,
          payload: id
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // search for friends by name
  const searchForFriends = async formData => {
    dispatch({ type: types.FRIENDS_LOADING });
    let queryArr = [];
    if (formData.firstName) queryArr.push(`firstName=${formData.firstName}`);
    if (formData.lastName) queryArr.push(`lastName=${formData.lastName}`);
    if (formData.nickName) queryArr.push(`nickName=${formData.nickName}`);
    const searchUrl = `/api/profiles/search?${queryArr.join("&")}`;
    try {
      const res = await axios.get(searchUrl);
      const resResult = res.data.searchResults;
      dispatch({ type: types.SEARCH_NAME, payload: resResult });
    } catch (err) {
      console.log(err);
    }
  };

  // search for friends by email
  const searchByEmail = async email => {
    dispatch({ type: types.FRIENDS_LOADING });
    const searchUrl = `/api/profile/email?email=${email}`;
    try {
      const searchResults = await axios.get(searchUrl);
      dispatch({ type: types.SEARCH_EMAIL, payload: searchResults });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FriendContext.Provider
      value={{
        mutualFriends: state.mutualFriends,
        requestsYouSent: state.requestsYouSent,
        requestsTheySent: state.requestsTheySent,
        searchResults: state.searchResults,
        loading: state.loading,
        test: state.test,
        loadFriends,
        createFriendRequest,
        updateFriendRequest,
        deleteFriend,
        searchForFriends,
        searchByEmail
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendState;
