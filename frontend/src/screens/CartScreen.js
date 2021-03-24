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
import Meta from "../components/Meta";

//actions
import { addToCart, removeFromCart } from "../actions/cartActions";

//match, location, and history are available from the react-router
//match will help with the params
//location will help get the query string
//history will help with the redirects
const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const proceedToCheckoutHandler = () => {
    //if they are not logged in they go to login, else they go to shipping
    history.push("/login?redirect=shipping");
  };

  //helper that returns how many items are in the cart
  const itemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <Meta title="Tailored by Tay - Cart" />
      <Link to="/products" className="btn btn-outline-secondary mb-3">
        Go Back to the Shop
      </Link>

      <Row>
        {/* checks to see if cart is empty, if it is, back button, else, render cart items */}
        <Col lg={8} xs={12} className="mb-3">
          {cartItems.length === 0 ? (
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
                    {/* name */}
                    <Col md={4} xs={12} className="mb-2">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    {/* image */}
                    <Col md={2} sm={5} xs={4} className="cart__image">
                      <Link to={`/products/${item.product}`}>
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Link>
                    </Col>
                    {/* size, price, form */}
                    <Col xs={2}>size {item.size}</Col>
                    <Col xs={1}>${item.price}</Col>
                    <Col sm={2} xs={3}>
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
                    {/* delete button */}
                    <Col md={1} xs={2}>
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
        <Col lg={4} xs={12}>
          <Card className="shadow">
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* shows how many items in cart, loop through cart and the items quantity to the accum */}
                <h3>
                  Subtotal (<strong>{itemsInCart}</strong>){" "}
                  {/* if there is only one item, singular, else, plural */}
                  {itemsInCart === 1 ? "item" : "items"}
                </h3>
                {/* whos the total price to fixed 2 digits */}
                <h4 className="mb-0">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h4>
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
