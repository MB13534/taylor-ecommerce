import { Col } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <Col className="text-center py-3">&copy; Tay</Col>
      </div>
      <div className="d-flex justify-content-center footer__social-icons">
        <a href="https://www.instagram.com">
          <i className="fab fa-instagram-square footer__social-icon"></i>
        </a>
        <a href="https://www.facebook.com">
          <i className="fab fa-facebook-square footer__social-icon"></i>
        </a>
        <a href="https://www.pinterest.com">
          <i className="fab fa-pinterest-square footer__social-icon"></i>
        </a>
        <a href="https://www.twitter.com">
          <i className="fab fa-twitter-square footer__social-icon"></i>
        </a>
        <a href="https://www.youtube.com">
          <i className="fab fa-youtube-square footer__social-icon"></i>
        </a>
      </div>

      <div>
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
      </div>
    </footer>
  );
};

export default Footer;
