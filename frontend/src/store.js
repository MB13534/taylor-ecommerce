import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//reducers
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

//takes object of all of the imported reducers
const reducer = combineReducers({
  //the key is the state, the value is the reducer
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

//upon inilization it will check local storage to see if there are any cartItems, if there is, it adds it to our initial state, otherwise it sets it as empty array
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
