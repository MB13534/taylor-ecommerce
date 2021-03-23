import { useState } from "react";
import { Form, Button } from "react-bootstrap";

//CSS
import "./SearchBox.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/search/${keyword}`);
      setKeyword("");
    } else {
      history.push("/products");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        placeholder="Search Inventory..."
        // variant="secondary"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="search-box__outline mr-2"
        autoComplete="off"
        value={keyword}
        size="sm"
      />
      <Button type="submit" variant="outline-secondary" className="p-2 btn-sm">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
