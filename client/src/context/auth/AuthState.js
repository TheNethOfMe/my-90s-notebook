import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import * as types from "../types";

import { storeData, getData, clearData } from "../../utils/manageLocalStorage";

const AuthState = props => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: null,
    loading: true,
    error: null,
    profile: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = async () => {
    console.log("Load User");
    dispatch({ type: types.AUTH_LOADING });
    // check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // check for user and profile data in local storage
    let userData = getData("user");
    let profileData = getData("profile");
    try {
      // if data not in local storage, get from api
      if (!userData) {
        const res = await axios.get("/api/auth");
        userData = res.data;
      }
      if (!profileData) {
        const res = await axios.get("/api/profile");
        profileData = res.data;
      }
      // add data to store
      dispatch({
        type: types.USER_LOADED,
        payload: { userData, profileData }
      });
      // save/update data in local storage
      storeData("user", userData);
      storeData("profile", profileData);
    } catch (error) {
      dispatch({ type: types.AUTH_ERROR });
    }
  };

  // register user
  const register = async (userData, profileData) => {
    const formData = { userData, profileData };
    console.log("AuthState", formData);
    // set headers for request
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      // register user in database and return data
      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data
      });
      storeData("user", res.data.user);
      storeData("profile", res.data.profile);
      storeData("expiresIn", Date.now() + 10800);
    } catch (error) {
      dispatch({
        type: types.REGISTER_FAIL,
        payload: error.response.data.msg
      });
    }
  };

  // login user
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      storeData("user", res.data.user);
      storeData("profile", res.data.profile);
      storeData("expiresIn", Date.now() + 10800);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      console.log("ERROR", error);
      dispatch({
        type: types.LOGIN_FAIL,
        payload: error.response.data.msg
      });
    }
  };

  // logout
  const logout = () => {
    console.log("LOGOUT");
    dispatch({ type: types.LOGOUT });
    clearData();
  };

  // clear errors
  const removeErrors = () => {
    dispatch({ type: types.CLEAR_ERRORS });
  };

  // update profile
  const updateProfile = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      console.log("AuthState", formData);
      const res = await axios.put("/api/profiles", formData, config);
      dispatch({ type: types.UPDATE_PROFILE, payload: res.data });
      console.log(res.data.profileData);
      storeData("profile", res.data.profileData);
      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        profile: state.profile,
        loadUser,
        register,
        login,
        logout,
        removeErrors,
        updateProfile
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
