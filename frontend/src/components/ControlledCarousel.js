import { Image } from "react-bootstrap";

const ControlledCarousel = ({ product }) => {
  const { images, name } = product;
  return (
    <div>
      <Image src={images[0]} alt={name} fluid className="w-100" />
    </div>
  );
};

export default ControlledCarousel;
