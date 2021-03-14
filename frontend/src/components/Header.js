import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Navbar
        fixed="top"
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        {/* logo */}
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <div className="header__logo">
                Tailored by Tay<strong>botique</strong>
              </div>
            </Navbar.Brand>
          </LinkContainer>

          {/* side/collapsable links */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* ml-auto or mr-auto adjusts the margin left or right (push links to right) */}
            <Nav className="ml-auto">
              <LinkContainer to="/products">
                <Nav.Link>
                  <i className="fas fa-tshirt mr-1"></i>Browse Inventory
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart mr-1"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user mr-1"></i>Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
