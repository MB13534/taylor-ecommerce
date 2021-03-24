import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//components
import Message from "../components/Message";
import BunnyLoader from "../components/BunnyLoader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";

//actions
import { listProductDetails, updateProduct } from "../actions/productActions";

//constants ACTIONS
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  //all of the current on screen input state
  const [name, setName] = useState("");
  const [nwt, setNwt] = useState(false);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [sex, setSex] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [subColor, setSubColor] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [images, setImages] = useState("");

  //upload loading status state
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (successUpdate) {
        dispatch({
          type: PRODUCT_UPDATE_RESET,
        });
        history.push("/admin/productlist");
      } else {
        if (!product.name || product._id !== productId) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setNwt(product.nwt);
          setBrand(product.brand);
          setPrice(product.price);
          setSize(product.size);
          setDescription(product.description);
          setSex(product.sex);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setColor(product.color);
          setSubColor(product.subColor);
          setCountInStock(product.countInStock);
          setImages(product.images.join(", "));
        }
      }
    }
  }, [dispatch, history, productId, product, loading, successUpdate]);

  //handle submit button
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
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
        countInStock,
        images: images.split(","),
      })
    );
  };
  //SAVE
  //when you upload an image, it must have multipart/form-data for content type in headers
  const uploadFileHandler = async (e) => {
    //e.target.files are all the files that are selected in the uploader
    const files = e.target.files;
    const formData = new FormData();

    //loops through array of files and appends them to formData
    for (var i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    //sets loading true before axios call
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      //axios call to add the images to url, with data, config
      const { data } = await axios.post("/api/upload", formData, config);
      //server returns an array of objects, make a newe array with just the paths and a leading /
      let paths = data.map((item) => "/" + item.path);
      //join the array together as one string seperated by ,
      paths = paths.join(", ");

      //if there were already images, then add a cama and then paths, if no current images, just add paths with no cama
      setImages(!images ? paths : images + ", " + paths);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-outline-secondary mb-3">
        Go Back to All Products
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <BunnyLoader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <BunnyLoader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* name */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* nNWTame */}
            <Form.Group controlId="nwt">
              <Form.Check
                type="checkbox"
                label="NWT?"
                checked={nwt}
                onChange={(e) => setNwt(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            {/* brand */}
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* price */}
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* size */}
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* description */}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* sex */}
            <Form.Group controlId="sex">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* category */}
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* subCategory */}
            <Form.Group controlId="subCategory">
              <Form.Label>sub Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sub Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* color */}
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* subColor */}
            <Form.Group controlId="subColor">
              <Form.Label>Sub Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sub Color"
                value={subColor}
                onChange={(e) => setSubColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* countInStock */}
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* images */}
            {/* upload */}
            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.File
                className="mb-2"
                id="image-file"
                label="Choose File"
                multiple
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <BunnyLoader />}
              {/* text */}
              <Form.Control
                as="textarea"
                rows={16}
                placeholder="Enter Images"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* button */}
            <Button type="submit" variant="secondary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      <Meta title="Tailored by Tay - Edit Product" />
    </>
  );
};

export default ProductEditScreen;
