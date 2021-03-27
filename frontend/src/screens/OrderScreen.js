import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
//renders button for paypal payments
import { PayPalButton } from "react-paypal-button-v2";

//components
import Message from "../components/Message";
import BunnyLoader from "../components/BunnyLoader";
import Meta from "../components/Meta";
import ConfirmationModal from "../components/ConfirmationModal";

//actions
import { getOrderDetails, payOrder, shipOrder } from "../actions/orderActions";

//constants // ACTIONS
import { ORDER_PAY_RESET, ORDER_SHIP_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  //functionality for the mark to shipped modal confirmation
  const [showShip, setShowShip] = useState(false);
  const handleCloseShip = () => setShowShip(false);
  const handleShowShip = (orderId) => {
    setShowShip(true);
  };

  //ebay sdk
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  //once the order goes through, we need access to the state that the action will send back
  const orderDetails = useSelector((state) => state.orderDetails);
  //deconstruct the orderDetails state
  const { order, loading, error } = orderDetails;

  //once the payment successfully goes through, we need access to the state that the action will send back
  const orderPay = useSelector((state) => state.orderPay);
  //deconstruct the orderPay state, since the variables are used above, rename them
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderShip = useSelector((state) => state.orderShip);
  const { loading: loadingShip, success: successShip } = orderShip;

  //used as a check to make sure user is logged in
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //check to make sure there is a user logged in
    if (!userInfo) {
      history.push("/login");
    }
    //we are dynamically building a JSscript for the paypal api
    const addPayPalScript = async () => {
      //first get the client id from the route that accesses our env
      const { data: clientId } = await axios.get("/api/config/paypal");
      //vanila JS to create a script tag
      const script = document.createElement("script");
      //set type to text and javascript
      script.type = "text/javascript";
      //set the source to the site on the paypal docs with the clientId injected
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      //make it async
      script.async = true;
      //we are going to build the 'software development kit' that paypal returns, we need a piece of state to let us know when it is ready
      //tells us once the script has been loaded
      script.onload = () => {
        setSdkReady(true);
      };
      //inject the script into the body
      document.body.appendChild(script);
    };

    //fetches the order details if it isnt already loaded or if success beacuse accessible
    if (!order || successPay || successShip || order._id !== orderId) {
      //must reset the order otherwise this will be an endless loop
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_SHIP_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      //if the order is not paid, add the paypal script
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay, history, userInfo, successShip]);

  //handler for a successful paypal payment
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const shipHandler = () => {
    dispatch(shipOrder(orderId));
  };

  //if it is laoding show the loader, if there is an errror, show error, else render order
  return loading ? (
    <BunnyLoader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="order-screen">
      <Meta title="Tailored by Tay - Order" />
      <h1>Order {order._id}</h1>
      <Row>
        <Col lg={8} className="mb-3">
          <ListGroup variant="flush">
            {/* shipping confirmation */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isShipped ? (
                <Message variant="success">
                  Shipped on {order.shippedAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Shipped</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              {/* payment confirmation */}
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* Check to confirm there are items in the cart */}
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row className="d-flex align-items-center">
                        <Col md={2} className="pl-0 pr-0 order-screen__image">
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
        <Col lg={4}>
          <Card className="shadow">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {/* items subtotal */}
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {/* shipping total */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {/* tax total */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {/* items TOTAL */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {/* if order is not paid, render the paypal pay button */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {/* show loader if it is loading or sdk isnot ready */}
                  {loadingPay && <BunnyLoader />}
                  {/* paypal button takes in total amount and the handler to handle a successful payment */}

                  {!sdkReady ? (
                    <BunnyLoader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingShip && <BunnyLoader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isShipped && (
                  <ListGroup.Item>
                    <Button block onClick={handleShowShip}>
                      Mark as Shipped
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ConfirmationModal
        show={showShip}
        onHide={handleCloseShip}
        confirmHandler={shipHandler}
        title="Mark as Shipped"
        body="Are you sure you want to mark this item as shipped?"
        cancelButton="Cancel"
        cancelButtonColor="primary"
        confirmButton="Ship"
        confirmButtonColor="secondary"
        id={orderId}
      />
    </div>
  );
};

export default OrderScreen;
