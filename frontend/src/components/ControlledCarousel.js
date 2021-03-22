import { Image, Carousel, Button } from "react-bootstrap";
import { useState } from "react";

const ControlledCarousel = ({ product }) => {
  let { images, name } = product;
  //carousel is rendered when index changes
  const [imageIndex, setImageIndex] = useState(0);

  //removes any image with '' as field, the seeder has some pictures that just have a cama
  if (images) {
    images = images.filter((image) => image.length > 2);
  }

  //previous button handle function, resets index when it completes loop
  const changeImageLeft = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  //next button handle function, resets index when it completes loop
  const changeImageRight = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  //handles the index if user clicks on the tally to switch pictures
  const handleSelect = (selectedIndex, e) => {
    setImageIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        fade
        activeIndex={imageIndex}
        controls={false}
        onSelect={handleSelect}
      >
        {/* maps through each image and loads the Carosel with the item and image */}
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
      {/* custom buttons */}
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
