import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
//useDispatch is used to get access to call actions, useSelector gets access to state
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";

//actions
import { listProducts } from "../actions/productActions";

//components
import Product from "../components/Product";
import BunnyLoader from "../components/BunnyLoader";
import Message from "../components/Message";

const HomeScreen = () => {
  //to use disatch you must define and call it
  const dispatch = useDispatch();

  //this needs to match what it is called in the store(key), to access state
  //useSelector takes in state and returns what portion of the state we want. THen you can deconstruct it
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  //useEffect takes a list of dependencies, it will fire off whenever any of those dependencies changes
  useEffect(() => {
    //fire off the listProducts action creator to fetch all the products
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {/* check the loading state to, loading icon if its loading, , check for error and render all the product cards if it is not */}
      {loading ? (
        //<Loader />
        <div className="centered">
          <BunnyLoader />
        </div>
      ) : error ? (
        //danger is red because it is an error
        <Message variant="danger">
          <h3>{error}</h3>
        </Message>
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
