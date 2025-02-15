const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const { products , filters} = require('./data/products')

app.get("/api/v1/product/getAllProducts", (req, res) => {
  console.log("request received to Server");
  return res.json({
    data: products,
  });
});

app.get("/api/v1/product/product-detail/:id", (req, res) => {
  const id = req.params.id;
  console.log("server got id", id);

  console.log("id to be Fetched on backend :", typeof id);
  const filteredProduct = products.filter((product) => {
    return product.id === Number(id);
  });
  console.log("filteredProduct : ", filteredProduct);
  return res.json({
    data: filteredProduct[0],
  });
});

app.get("/api/v1/product/filters/:id", (req, res) => {
  const { id : filter} = req.params;
  console.log(filter);
  const requiredFilter = filters.filter((product) => {
    return (product.id) === (filter);
  });
  return res.json({
    "result":requiredFilter[0]
  });
});

app.listen(5000, () => {
  console.log("Server started Listening in App.js Backend");
});

