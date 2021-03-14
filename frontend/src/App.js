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

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products" component={AllProductsScreen} exact />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
