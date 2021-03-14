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
  } = props.product;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} lg={4}>
              <Image
                src={images[0]}
                alt={name}
                fluid
                className="d-block mx-auto w-100"
              />
            </Col>
            <Col xs={12} lg={8}>
              <h4>{brand}</h4>
              <p>{description}</p>
              <div classname="d-flex align-items-center justify-content-space-between">
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

      <Modal.Footer>
        <LinkContainer to="/products">
          <Button className="mx-auto btn-lng" onClick={props.onHide}>
            View Full Listing
          </Button>
        </LinkContainer>

        <Button
          variant="secondary"
          className="mx-auto btn-lng"
          onClick={props.onHide}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
