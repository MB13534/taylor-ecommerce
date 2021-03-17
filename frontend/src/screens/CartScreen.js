import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

//components
import Message from "../components/Message";

//actions
import { addToCart } from "../actions/cartActions";

//match, location, and history are available from the react-router
//match will help with the params
//location will help get the query string
//history will help with the redirects
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  //this is the query params
  //if it exists, we only want the number portion (?qty=1)
  //split it into two arrays at the equals and take the second index
  //format it from string to number
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    //adds to cart if the productId was found in the params
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>CART SCREEN</div>;
};

export default CartScreen;
