import { Image, Carousel, Button } from "react-bootstrap";
import { useState } from "react";

const ControlledCarousel = ({ product }) => {
  //carousel is rendered when index changes
  const [imageIndex, setImageIndex] = useState(0);
  let { images, name } = product;

  //removes any image with '' as field
  if (images) {
    images = images.filter((image) => image !== "");
  }

  const changeImageLeft = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  const changeImageRight = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const handleSelect = (selectedIndex, e) => {
    setImageIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        activeIndex={imageIndex}
        controls={false}
        onSelect={handleSelect}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Image
              src={images[imageIndex]}
              alt={name}
              fluid
              className="w-100"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex mt-2 mb-2">
        <Button variant="outline-dark" block onClick={() => changeImageLeft()}>
          Previous
        </Button>
        <Button
          variant="dark"
          block
          className="h-100 mt-0"
          onClick={() => changeImageRight()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default ControlledCarousel;
