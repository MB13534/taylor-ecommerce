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
  //base url
  const routerBaseName = process.env.PUBLIC_URL;

  return (
    <Router basename={routerBaseName}>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/products" component={AllProductsScreen} exact />
          <Route path="/products/:id" component={ProductScreen} />
          {/* the ? makes the id optional */}
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
