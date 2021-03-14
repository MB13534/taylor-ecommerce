import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);

  return (
    <>
      <Link to="/products" className="btn btn-secondary">
        Go Back
      </Link>
      <Row>
        <Col md={4}>
          <Image src={product.images[0]} alt={product.name} />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
