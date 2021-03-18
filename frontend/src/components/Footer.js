import { Container, Row, Col } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">&copy; Tay</Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <small>
              created with ❤️ by
              <a
                href="https://www.linkedin.com/in/barrymj/"
                className="text-info"
              >
                <strong> MB</strong>
              </a>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
