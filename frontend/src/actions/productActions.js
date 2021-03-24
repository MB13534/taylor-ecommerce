import axios from "axios";

//constants
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REMOVE_INVENTORY_REQUEST,
  PRODUCT_REMOVE_INVENTORY_SUCCESS,
  PRODUCT_REMOVE_INVENTORY_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_FEATURED_REQUEST,
  PRODUCT_FEATURED_SUCCESS,
  PRODUCT_FEATURED_FAIL,
} from "../constants/productConstants";

//actions
import { logout } from "./userActions";

//keyword is the search word, default to empty string
export const listProducts = (
  keyword = "",
  pageNumber = "",
  pageSize = "",
  filter = ""
) => async (dispatch) => {
  try {
    //immediatly dispatch the action request to update state to product = [] and loading = true
    dispatch({ type: PRODUCT_LIST_REQUEST });

    //data is pages, product, and the page
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`
    );
    //after successfuling fetching the data dispatch action request success to update loading to false and product to action.payload
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if fail, dispatch action fail to change state to loading fail, and error
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    //immediatly dispatch the action request to update state to product = {} and loading = true
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    //after successfuling fetching the data dispatch action request success to update loading to false and product to action.payload
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if fail, dispatch action fail to change state to loading fail, and error
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductInventory = (id) => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: PRODUCT_REMOVE_INVENTORY_REQUEST,
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

    //patch the request with route, and config
    await axios.patch(`/api/products/${id}`, id, config);

    dispatch({
      type: PRODUCT_REMOVE_INVENTORY_SUCCESS,
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
      type: PRODUCT_REMOVE_INVENTORY_FAIL,
      payload: message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
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
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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

    //patch the request with route, and config
    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
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
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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

    //patch the request with route, and config
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
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
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const listFeaturedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FEATURED_REQUEST });

    const { data } = await axios.get(`/api/products/featured`);

    dispatch({
      type: PRODUCT_FEATURED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //if fail, dispatch action fail to change state to loading fail, and error
    dispatch({
      type: PRODUCT_FEATURED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
