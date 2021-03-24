import axios from "axios";

//constants
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

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
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  //call reducer to update state
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = "/login";
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_REGISTER_REQUEST });

    //we must create a config object because when we send data we need to send a content type of application/json
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //first argument is url, second is credentials, third is config
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );
    //send off to reducer to update state
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    //also dispatch user login so once the user registers, they also login
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //set the user to local storage. it will stay on the clients side for further authentication
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_DETAILS_REQUEST });

    //destructure two levels of getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //we must create a config object because when we send data we need to send a content type of application/json
    //the token comes from the getState destructure
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //first argument is url, second is config
    const { data } = await axios.get(`/api/users/${id}`, config);
    //send off to reducer to update state
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    //destructure two levels of getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //we must create a config object because when we send data we need to send a content type of application/json
    //the token comes from the getState destructure
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //first argument is url, second is user object updatres, third is config
    const { data } = await axios.put(`/api/users/profile`, user, config);
    //send off to reducer to update state
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    //since the user might update their name, the navbar will be affected and must be reloaded
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    //update local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_DELETE_REQUEST });

    //destructure two levels of getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //we must create a config object because when we send data we need to send a content type of application/json
    //the token comes from the getState destructure
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //first argument is url, second is config
    await axios.delete(`/api/users/${id}`, config);
    //send off to reducer to update state
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_UPDATE_REQUEST });

    //destructure two levels of getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //we must create a config object because when we send data we need to send a content type of application/json
    //the token comes from the getState destructure
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //first argument is url, second is user,. third isconfig
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    //send off to reducer to update state
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
