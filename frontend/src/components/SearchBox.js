import { useState } from "react";
import { Form, Button } from "react-bootstrap";

//CSS
import "./SearchBox.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("Title");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/search/${keyword}/${filter.toLowerCase()}`);
      setKeyword("");
    } else {
      history.push("/products");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        placeholder={`Search by ${filter}...`}
        // variant="secondary"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="header__search-box"
        autoComplete="off"
        value={keyword}
        size="sm"
      />
      <Form.Control
        className="mr-2 header__select"
        size="sm"
        style={{ width: "20px", height: "20px" }}
        as="select"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option>Title</option>
        <option>Brand</option>
        <option>Size</option>
        <option>Gender</option>
        <option>Category</option>
        <option>Color</option>
        <option>Description</option>
      </Form.Control>

      <Button type="submit" variant="secondary" className="p-2 btn-sm py-0">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
