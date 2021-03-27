import { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//components
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

//actions
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  //check to make sure previous pages were filled
  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  //calculate prices (tax, shipping, subtotal ect)
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  //shipping needs a system
  //if its over $100 => fee shipping, else $10
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;

  //tax needs a system
  cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);

  //total
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  //once the order goes through, we need access to the state that the action will send back
  const orderCreate = useSelector((state) => state.orderCreate);
  //deconstruct the orderCreate state
  const { order, success, error } = orderCreate;

  useEffect(() => {
    //if the state returns a success, then we redirect the user to the order confirmation page
    if (success) {
      history.push(`/orders/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success, order, dispatch]);

  const handlePlaceOrder = () => {
    // pass in the whole order as an object
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="place-order-screen">
      <Meta title="Tailored by Tay - Place Order" />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8} className="mb-3">
          <ListGroup variant="flush">
            {/* shipping confirmation */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              {/* payment confirmation */}
              <h2>Payment Method</h2>

              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* Check to confirm there are items in the cart */}
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row className="d-flex align-items-center">
                        <Col
                          md={2}
                          className="pl-0 pr-0 place-order-screen__image"
                        >
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} ={" "}
                          <strong>${item.qty * item.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="shadow">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {/* items subtotal */}
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* shipping total */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {/* tax total */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* items TOTAL */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* if the order submission returns an error, display it */}
              <ListGroup.Item>
                {error && <Message variant="danger"></Message>}
              </ListGroup.Item>
              {/* place order button */}
              <ListGroup.Item>
                <Button
                  block
                  disabled={cart.cartItems.length === 0}
                  onClick={handlePlaceOrder}
                  variant="secondary"
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
