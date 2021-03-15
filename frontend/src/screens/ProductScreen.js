import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

//components
import ControlledCarousel from "../components/ControlledCarousel";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  //use effect cannot be async. Define function that is async and then immediatly call it
  //useEffect takes a list of dependencies, it will fire off whenever any of those dependencies changes
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match]);

  const {
    name,
    nwt,
    brand,
    price,
    size,
    description,
    sex,
    category,
    subCategory,
    color,
    subColor,
    _id: id,
    countInStock,
  } = product;

  //add to cart button function
  const handleAddToCart = () => {
    console.log(`added ${id} to cart`);
  };

  return (
    <>
      {/* check to see if product object has an image element, render if it does
    cant just check for the object because it exists as {}. */}
      {!product.images ? null : (
        <>
          {/* back button */}
          <Link to="/products" className="btn btn-outline-secondary mb-3">
            Go Back
          </Link>
          <Row>
            {/* left col is picture, half of the row */}
            <Col md={12} lg={5}>
              {/* image carousel */}
              <ControlledCarousel product={product} />
              {/* <Image src={images[0]} alt={name} fluid className="w-100" /> */}
            </Col>
            {/* middle col is descriptions, one third of the row */}
            <Col md={12} lg={4}>
              <ListGroup variant="flush" className="mb-3">
                {/* name (small description) */}
                <ListGroup.Item>
                  <h4 className="mb-0" style={{ color: "#5a5a5a" }}>
                    {name}
                  </h4>
                </ListGroup.Item>
                {/* brand and nwt */}
                <ListGroup.Item>
                  <Container className="px-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-dark">{brand}</h5>
                    {nwt && (
                      <span className="badge badge-pill badge-primary">
                        NWT
                      </span>
                    )}
                  </Container>
                </ListGroup.Item>
                {/* price and size */}
                <ListGroup.Item>
                  <Container className="px-0 d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 text-dark">${price}</h3>
                    <div className="d-flex align-items-center">
                      <small className="text-uppercase mr-1">size</small>
                      <h3 className="mb-0 d-flex align-items-center">
                        <span className="badge badge-pill badge-primary">
                          <strong>{size}</strong>
                        </span>
                      </h3>
                    </div>
                  </Container>
                </ListGroup.Item>
                {/* description */}
                <ListGroup.Item>{description}</ListGroup.Item>
                {/* sex, category, subCategory */}
                <ListGroup.Item>
                  <Container className="px-0 d-flex align-items-center">
                    <span className="badge badge-pill badge-primary mr-2">
                      {sex}
                    </span>
                    <span className="badge badge-pill badge-primary mr-2">
                      {category}
                    </span>
                    {subCategory && (
                      <span className="badge badge-pill badge-primary">
                        {subCategory}
                      </span>
                    )}
                  </Container>
                </ListGroup.Item>
                {/* color and subColor */}
                <ListGroup.Item>
                  <Container className="px-0 d-flex align-items-center">
                    <span className="badge badge-pill badge-primary mr-2">
                      {color}
                    </span>

                    {subColor && (
                      <span className="badge badge-pill badge-primary">
                        {subColor}
                      </span>
                    )}
                  </Container>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {/* third col is add to cart */}
            <Col md={12} lg={3}>
              <Card className="shadow">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Price:</strong>
                      </Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Status:</strong>
                      </Col>
                      <Col>
                        {countInStock > 0 ? (
                          <span className="badge badge-primary">In Stock</span>
                        ) : (
                          <span className="badge badge-danger">Sold</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      variant="secondary"
                      className="btn-block btn-lg"
                      onClick={handleAddToCart}
                      disabled={countInStock < 1}
                    >
                      {countInStock < 1 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
