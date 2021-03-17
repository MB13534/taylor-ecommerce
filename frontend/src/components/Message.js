import { Alert } from "react-bootstrap";

//children is the text we want inside
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

//set a default for variant
//info is just a blue color
Message.defaultProps = {
  variant: "info",
};

export default Message;
