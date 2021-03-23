import axios from "axios";

//constants
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

//actions
import { logout } from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //post the request with route, order info, and config
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //post the request with route,  and config
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
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
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //post the request with route, paypal payment result, and config
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
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
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //post the request with route, and config
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
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
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    //immediatly dispatch the action request to update state to order = [] and loading = true
    dispatch({ type: ORDER_LIST_REQUEST });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders", config);
    //after successfuling fetching the data dispatch action request success to update loading to false and product to action.payload
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if fail, dispatch action fail to change state to loading fail, and error
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shipOrder = (orderId) => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: ORDER_SHIP_REQUEST,
    });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //post the request with route and config
    //**dont forget to put the empty opject */
    const { data } = await axios.put(`/api/orders/${orderId}/ship`, {}, config);

    dispatch({
      type: ORDER_SHIP_SUCCESS,
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
      type: ORDER_SHIP_FAIL,
      payload: message,
    });
  }
};
