import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <div className="header__logo">
              Tailored by Tay<strong>Shopping</strong>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* ml-auto or mr-auto adjusts the margin left or right (push links to right) */}
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart mr-1"></i>Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <i className="fas fa-user mr-1"></i>Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
