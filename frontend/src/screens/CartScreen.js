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
import { addToCart, removeFromCart } from "../actions/cartActions";

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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const proceedToCheckoutHandler = () => {
    //if they are not logged in they go to login, else they go to shipping
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <Link to="/products" className="btn btn-outline-secondary mb-3">
        Go Back
      </Link>

      <Row>
        {/* checks to see if cart is empty, if it is, back button, else, render cart items */}
        <Col md={8}>
          {cartItems === 0 ? (
            <div>
              <Message>Your Cart is Empty</Message>
            </div>
          ) : (
            //rendered cart items
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  {/* pic, name, size, price, qty, delete */}
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Link to={`/products/${item.product}`}>
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Link>
                    </Col>
                    <Col md={4}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>size {item.size}</Col>
                    <Col md={1}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {/* this will give us an array counting up to keys. If the qty was 4, the array would be [0, 1, 2, 3] */}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* shows how many items in cart, loop through cart and the items quantity to the accum */}
                <h3>
                  Subtotal (
                  <strong>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </strong>
                  ) items
                </h3>
                {/* whos the total price to fixed 2 digits */}$
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="secondary"
                  className="btn-block btn-lg"
                  onClick={proceedToCheckoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
