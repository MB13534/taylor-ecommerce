import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./Product.css";

//components
import ProductModal from "../components/ProductModal";

const Product = ({ product }) => {
  const {
    name,
    images,
    brand,
    nwt,
    size,
    price,
    countInStock,
    _id: id,
  } = product;
  //local state to toggle viewing the quick view modal, gets passed to ProductModal
  const [modalShow, setModalShow] = useState(false);

  //add to cart button function
  const handleAddToCart = () => {
    console.log(`added ${id} to cart`);
  };

  return (
    <Card className="my-3 p-3 rounded text-dark shadow test">
      {/* image */}
      <Link to={`/products/${id}`}>
        <Card.Img
          src={images[0]}
          variant="top"
          className="position-relative product__image"
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
          <Card.Text as="div">
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
          onClick={handleAddToCart}
          disabled={countInStock < 1}
        >
          {countInStock < 1 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Card.Footer>

      {/* modal, modalShow is the boolean which is toggled by setModalShow */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </Card>
  );
};

export default Product;
