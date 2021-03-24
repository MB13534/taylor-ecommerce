import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

//CSS
import "./FeaturedCarousel.css";

//components
import BunnyLoader from "./BunnyLoader";
import Message from "./Message";

//actions
import { listFeaturedProducts } from "../actions/productActions";

const FeaturedCarousel = () => {
  const dispatch = useDispatch();

  const featuredProducts = useSelector((state) => state.productFeatured);
  const { loading, error, products } = featuredProducts;

  useEffect(() => {
    dispatch(listFeaturedProducts());
  }, [dispatch]);

  return loading ? (
    <BunnyLoader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.images[0]} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FeaturedCarousel;
