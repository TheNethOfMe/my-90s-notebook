import * as types from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.userData,
        profile: action.payload.profileData
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
    case types.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        profile: null
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case types.UPDATE_THEME:
      return {
        ...state,
        user: {
          theme: action.payload,
          ...state.user
        }
      };
    case types.CREATE_PROFILE:
    case types.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};
