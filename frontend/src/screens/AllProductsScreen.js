import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
//useDispatch is used to get access to call actions, useSelector gets access to state
import { useDispatch, useSelector } from "react-redux";

// import Loader from "../components/Loader";

//actions
import { listProducts } from "../actions/productActions";

//components
import Product from "../components/Product";
import BunnyLoader from "../components/BunnyLoader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const AllProductsScreen = ({ match }) => {
  //check to see if there is a search param
  const keyword = match.params.keyword;
  //check to see if there is a search param
  const filter = match.params.filter;
  //checks to see if the result was split by pagination
  const pageNumber = match.params.pageNumber || 1;
  //to use disatch you must define and call it
  const pageSize = 50;
  //to use disatch you must define and call it
  const dispatch = useDispatch();

  //this needs to match what it is called in the store(key), to access state
  //useSelector takes in state and returns what portion of the state we want. THen you can deconstruct it
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, count } = productList;

  //this will be used when rendering each product, so it knows if the quick add button should start as pressed or not
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //useEffect takes a list of dependencies, it will fire off whenever any of those dependencies changes
  useEffect(() => {
    //fire off the listProducts action creator to fetch all the products
    //will also account for narrowing down the results if there is a keyword
    dispatch(listProducts(keyword, pageNumber, pageSize, filter));
  }, [dispatch, keyword, pageNumber, pageSize, filter]);

  return (
    <>
      <Meta title="Tailored by Tay - Shopping" />
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
          <h2>
            {keyword &&
              count > 4 &&
              `There is a total of ${count} items that meet the criteria of ${keyword} in ${filter}.`}
          </h2>
          {count === 0 && (
            <h2>There are currently no items. Please check back later!</h2>
          )}
          {!keyword && count !== 0 && (
            <h2>
              There are currently {count} items available. Happy shopping!
            </h2>
          )}
          <>
            <Paginate
              filter={filter}
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
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
                  <Product product={product} cartItems={cartItems} />
                </Col>
              ))}
            </Row>
            <Paginate
              filter={filter}
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        </>
      )}
    </>
  );
};

export default AllProductsScreen;
