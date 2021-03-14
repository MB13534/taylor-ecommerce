import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./Product.css";

//components
import ProductModal from "../components/ProductModal";

const Product = ({ product }) => {
  const { name, images, brand, nwt, size, price, _id } = product;
  const [modalShow, setModalShow] = useState(false);

  const handleAddToCart = () => {
    console.log(`added ${_id} to cart`);
  };

  return (
    <Card className="my-3 p-3 rounded text-dark shadow test">
      <Link to={`/product/${_id}`}>
        <Card.Img src={images[0]} variant="top" className="position-relative" />
      </Link>
      {nwt && <span className="nwt badge badge-pill badge-primary">NWT</span>}

      <div className="card-body m-0 p-0">
        <Link to={`/product/${name}`}>
          <Card.Text as="div" className="text-dark name__font pt-1">
            {name}
          </Card.Text>
        </Link>

        <Container className="px-0 d-flex justify-content-between pt-1">
          <Card.Text as="div">
            <strong>${price}</strong>
          </Card.Text>
          <Card.Text as="div">
            <small className="text-uppercase mr-1 size__font">size</small>

            <span className="badge badge-pill badge-primary">
              <strong>{size}</strong>
            </span>
          </Card.Text>
        </Container>

        <Card.Title className="my-1">
          <strong>{brand}</strong>
        </Card.Title>
      </div>

      <Card.Footer>
        <Button
          className="btn-block"
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Quick View
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="btn-block"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card.Footer>

      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </Card>
  );
};

export default Product;
