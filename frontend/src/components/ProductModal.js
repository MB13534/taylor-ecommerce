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
    _id: id,
    countInStock,
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
              {/* brand and nwt */}
              <Container className="px-0 mb-3 d-flex justify-content-between align-items-center">
                <h4 className="mb-0 text-dark">{brand}</h4>
                {nwt && (
                  <span className="badge badge-pill badge-primary">NWT</span>
                )}
              </Container>
              {/* description */}
              <p>{description}</p>
              {/* price and size */}
              <Container className="px-0 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <small className="text-uppercase mr-1">size</small>
                  <h3 className="mb-0 d-flex align-items-center">
                    <span className="badge badge-pill badge-primary">
                      <strong>{size}</strong>
                    </span>
                  </h3>
                </div>
                <h3 className="mb-0">${price}</h3>
              </Container>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      {/* buttons */}
      <Modal.Footer className="justify-content-right">
        <LinkContainer to={`/products/${id}`}>
          <Button className="btn-lng">View Full Listing</Button>
        </LinkContainer>

        <Button
          type="button"
          variant="secondary"
          className="btn-lng"
          onClick={handleAddToCart}
          disabled={countInStock < 1}
        >
          {countInStock < 1 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;