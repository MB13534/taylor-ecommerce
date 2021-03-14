import { Modal, Button, Row, Col, Container, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductModal = (props) => {
  const {
    images,
    name,
    nwt,
    brand,
    price,
    size,
    description,
    category,
    subCategory,
    color,
    subColor,
    _id: id,
  } = props.product;

  //add to cart button function
  const handleAddToCart = () => {
    console.log(`added ${id} to cart`);
  };

  return (
    //basic modal properties
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* close button */}
      <Modal.Header closeButton>
        {/* name (short description) */}
        <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {/* left col */}
            <Col xs={12} lg={4}>
              {/* image */}
              <Image
                src={images[0]}
                alt={name}
                fluid
                className="d-block mx-auto w-100"
              />
            </Col>
            {/* right col */}
            <Col xs={12} lg={8}>
              {/* brand */}
              <h4>{brand}</h4>
              {/* description */}
              <p>{description}</p>
              {/* price and size */}
              <div className="d-flex align-items-center justify-content-space-between">
                <h3 className="d-inline">${price}</h3>
                <h3 className="d-inline">
                  <small>size</small>
                  {size}
                </h3>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      {/* buttons */}
      <Modal.Footer>
        <LinkContainer to={`/products/${id}`}>
          <Button className="mx-auto btn-lng">View Full Listing</Button>
        </LinkContainer>

        <Button
          onClick={handleAddToCart}
          variant="secondary"
          className="mx-auto btn-lng"
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
