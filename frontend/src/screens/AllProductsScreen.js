import { Row, Col } from "react-bootstrap";
import BunnyLoader from "../components/BunnyLoader";
import { useState, useEffect } from "react";
import axios from "axios";

//components
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  //use effect cannot be async. Define function that is async and then immediatly call it
  //useEffect takes a list of dependencies, it will fire off whenever any of those dependencies changes
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* check to see if products array has an element, render if it does
    cant just check for the array because it exists as []. */}
      {!products[0] ? (
        <div className="centered">
          <BunnyLoader />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;
