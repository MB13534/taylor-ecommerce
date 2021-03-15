const express = require("express");

//data
const products = require("./data/products");

const app = express();
const PORT = 5000;

//if port 5000 receives a get request to '/', respond with
app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

//if port 5000 receives a get request to '/api/products', respond with all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//if port 5000 receives a get request to '/api/products/id', respond with that single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
