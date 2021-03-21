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
  document.location.href = "/taylor-ecommerce/login";
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
    //dispatch to reducer to change state to loading
    dispatch({ type: USER_LIST_REQUEST });

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
    const { data } = await axios.get(`/api/users`, config);
    //send off to reducer to update state
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if there is an error
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
