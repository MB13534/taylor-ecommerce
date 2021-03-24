import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//components
import Message from "../components/Message";
import BunnyLoader from "../components/BunnyLoader";
import ConfirmationModal from "../components/ConfirmationModal";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

//actions
import {
  listProducts,
  removeProductInventory,
  createProduct,
  deleteProduct,
} from "../actions/productActions";

//constants ACTIONS
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productRemoveInventory = useSelector(
    (state) => state.productRemoveInventory
  );
  const {
    loading: loadingRemove,
    error: errorRemove,
    success: successRemove,
  } = productRemoveInventory;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber, 300));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successRemove,
    successCreate,
    createdProduct,
    successDelete,
    pageNumber,
  ]);

  const removeInventoryHandler = (id) => {
    dispatch(removeProductInventory(id));
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  //remove item modal functionality
  const [showRemove, setShowRemove] = useState(false);
  const [modalItemId, setModalItemId] = useState({});

  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = (id) => {
    setModalItemId(id);
    setShowRemove(true);
  };

  //delete item modal functionality
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setModalItemId(id);
    setShowDelete(true);
  };

  return (
    <>
      <Meta title="Tailored by Tay - Products" />
      <Row className="align-items-center">
        <Col>
          <h1 className="mb-0">Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            variant="secondary"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingRemove && <BunnyLoader />}
      {errorRemove && <Message variant="danger">{errorRemove}</Message>}
      {loadingDelete && <BunnyLoader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <BunnyLoader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <BunnyLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Paginate pages={pages} page={page} isAdmin={true} />
          <Table striped bordered hover responsive className="table-sm ">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Brand</th>
                <th>PICTURE</th>
                <th>SIZE</th>
                <th>NWT</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>DELETE</th>
                <th>EDITS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-dark">
                  <td>
                    <Link to={`/products/${product._id}`}>{product._id}</Link>
                  </td>

                  <td>{product.name}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Image
                      style={{ height: "68px", width: "68px" }}
                      src={product.images[0]}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </td>
                  <td>{product.size}</td>
                  <td>{product.nwt && "NWT"}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Button
                      onClick={() => handleShowDelete(product._id)}
                      variant="danger"
                      className="btn-lg mt-2"
                      block
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button block variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      onClick={() => handleShowRemove(product._id)}
                      disabled={product.countInStock < 1 && "disabled"}
                      block
                      variant="warning"
                      className="btn-sm"
                    >
                      <i className="fab fa-creative-commons-zero"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <ConfirmationModal
              show={showRemove}
              onHide={handleCloseRemove}
              confirmHandler={removeInventoryHandler}
              title="Removing all Inventory"
              body="Are you sure you want to remove all of the inventory from this item?"
              cancelButton="Cancel"
              cancelButtonColor="primary"
              confirmButton="Remove Inventory"
              confirmButtonColor="secondary"
              id={modalItemId}
            />

            <ConfirmationModal
              show={showDelete}
              onHide={handleCloseDelete}
              confirmHandler={deleteProductHandler}
              title="Delete Product"
              body="Are you sure you want delete this item from the database?"
              cancelButton="Cancel"
              cancelButtonColor="primary"
              confirmButton="Delete Item"
              confirmButtonColor="secondary"
              id={modalItemId}
            />
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
