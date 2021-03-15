import { Row, Col } from "react-bootstrap";

//data
import products from "../products";

//components
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {/* renders all of the product carts in a grid format, each product goes in a col, already in a row */}
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="d-flex justify-content-center align-self-stretch"
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
