import { Container } from "react-bootstrap";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      {/* padding y axis 1rem */}
      <main className="py-3">
        <Container>
          <h2>Welcome</h2>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
