import axios from "axios";

//constants
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      nwt: data.nwt,
      brand: data.brand,
      price: data.price,
      size: data.size,
      description: data.description,
      sex: data.sex,
      category: data.category,
      subCategory: data.subCategory,
      color: data.color,
      subColor: data.subColor,
      countInStock: data.countInStock,
      images: data.images,
      qty,
    },
  });

  //saving objejct in local storage as 'cartItems'
  //getState will allow us to access our current state, after the current add to cart has finished
  //localStorage can only save strings, not JS objects, so we must stringify
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//takes in form data
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  //save shipping address as shippingAddress in local storage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

//takes in form data which is payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  //save shipping address as shippingAddress in local storage
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
