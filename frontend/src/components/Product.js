import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./Product.css";

//components
import ProductModal from "../components/ProductModal";

//actions
import { addToCart } from "../actions/cartActions";

const Product = (props) => {
  //local state to toggle viewing the quick view modal, gets passed to ProductModal
  const [modalShow, setModalShow] = useState(false);
  //local state to toggle if the quick add button was pressed
  const [buttonPressed, setButtonPressed] = useState(false);

  const {
    name,
    images,
    brand,
    nwt,
    size,
    price,
    countInStock,
    _id: id,
  } = props.product;

  const dispatch = useDispatch();
  //add to cart button function
  const handleAddToCart = () => {
    setButtonPressed(true);
    dispatch(addToCart(id, 1));
  };

  //checks to see if the current item is already in the cart, if it is, the cart button will default to true
  const existItem = props.cartItems.find((cartItem) => cartItem.product === id);
  useEffect(() => {
    if (existItem) {
      setButtonPressed(true);
    }
  }, [existItem]);

  //helper function to pass to Modal
  const setModalShowFalse = () => {
    setModalShow(false);
  };

  return (
    <Card className="my-3 p-3 rounded text-dark shadow test">
      {/* image */}
      <Link to={`/products/${id}`}>
        <Card.Img
          src={images[0]}
          variant="top"
          className="position-relative product__image rounded"
        />
      </Link>
      {nwt && <span className="nwt badge badge-pill badge-primary">NWT</span>}

      {/* name (short description) */}
      <div className="card-body m-0 p-0">
        <Link to={`/products/${id}`}>
          <Card.Text as="div" className="text-dark name__font pt-1">
            {name}
          </Card.Text>
        </Link>

        {/* price and size */}
        <Container className="px-0 d-flex justify-content-between pt-1">
          <Card.Text as="div">
            <strong>${price}</strong>
          </Card.Text>
          <Card.Text as="div" className="d-flex align-items-center">
            <small className="text-uppercase mr-1 size__font text-muted">
              size
            </small>
            <span className="badge badge-pill badge-primary">
              <strong>{size}</strong>
            </span>
          </Card.Text>
        </Container>

        {/* brand */}
        <Card.Title className="my-1">
          <strong>{brand}</strong>
        </Card.Title>
      </div>

      {/* buttons */}
      <Card.Footer>
        <Button
          size="sm"
          block
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Quick View
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          block
          onClick={() => handleAddToCart()}
          disabled={countInStock < 1 || buttonPressed}
        >
          {/* if the button gets pressed, it is disabled and says Card Quantity x1 */}
          {buttonPressed
            ? "Item in Cart"
            : countInStock < 1
            ? "Out of Stock"
            : "Quick Add to Cart"}
        </Button>
      </Card.Footer>

      {/* modal, modalShow is the boolean which is toggled by setModalShow */}
      <ProductModal
        show={modalShow}
        onHide={setModalShowFalse}
        product={props.product}
        handleAddToCart={handleAddToCart}
        buttonPressed={buttonPressed}
      />
    </Card>
  );
};

export default Product;
