import axios from "axios";

//constants
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_LOGIN_REQUEST });

    //we must create a config object because when we send data we need to send a content type of application/json
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //first argument is url, second is credentials, third is config
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    //send off to reducer to update state
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    //set the user to local storage. it will stay on the clients side for further authentication
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  //remove from local storage
  localStorage.removeItem("userInfo");
  //call reducer to update state
  dispatch({ type: USER_LOGOUT });
};
