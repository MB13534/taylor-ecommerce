import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";

//actions
import { logout } from "../actions/userActions";

//components
import SearchBox from "./SearchBox";

//css
import "./Header.css";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
            {/* the navbar does not have direct access to history, so we need Route to render it for us */}
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className="ml-auto">
              <LinkContainer to="/products">
                <Nav.Link>
                  <i className="fas fa-tshirt mr-1"></i>
                  <span className="header__responsive-text">
                    Browse Inventory
                  </span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart mr-1"></i>
                  <span className="header__responsive-text">Cart</span>
                </Nav.Link>
              </LinkContainer>
              {/* if the user is logged in, show name and drop down menu */}
              {userInfo ? (
                //user name
                //renders an icon and the name if there is a user, the icon and text is responsive
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user mr-1 header__responsive-icon"></i>{" "}
                      <span className="header__responsive-text">
                        {userInfo.name}
                      </span>{" "}
                    </span>
                  }
                  id="username"
                >
                  {/* uprofile link */}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {/* logout button */}
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                //if the user is not logged in, show the sign in button
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user mr-1"></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                //admin privs
                <NavDropdown title="Admin" id="adminmenu">
                  {/* admin users list */}
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  {/* admin products list */}
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  {/* admin orders list */}
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
