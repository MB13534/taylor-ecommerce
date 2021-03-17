import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //the payload will have the product id called 'product'
      const item = action.payload;

      //we have to handle the case in which the user tries to add an item that is already in the cart
      //comparing each item's product id in cart with current item's product id
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        };
      } else {
        //if it doesnt exist, push it to the state array
        //spread all of current state, and update cartItems to all of current cartItems plus the new item
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};
