import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//screens
import AllProductsScreen from "./screens/AllProductsScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  //base url
  const routerBaseName = process.env.PUBLIC_URL;

  return (
    <Router basename={routerBaseName}>
      <Header />
      <main className="py-3">
        <Route path="/" component={HomeScreen} exact />
        <Container>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/orders/:id" component={OrderScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />

          <Route path="/products/:id" component={ProductScreen} exact />
          {/* the ? makes the id optional */}
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/admin/userlist" component={UserListScreen} exact />
          <Route
            path="/admin/users/:id/edit"
            component={UserEditScreen}
            exact
          />

          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/products/:id/edit"
            component={ProductEditScreen}
            exact
          />
          <Route path="/admin/orderlist" component={OrderListScreen} exact />
          <Route path="/products" component={AllProductsScreen} exact />
          <Route
            path="/products/page/:pageNumber/:filter"
            component={AllProductsScreen}
            exact
          />
          <Route
            path="/products/search/:keyword/:filter"
            component={AllProductsScreen}
            exact
          />
          <Route
            path="/products/search/:keyword/page/:pageNumber/:filter"
            component={AllProductsScreen}
            exact
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
