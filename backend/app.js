// import dotenv ...

const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");
app.use(cors());

const { products, filters } = require("./data/products");

app.use(express.json());

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
    data: filteredProduct.length == 0 ? [] : filteredProduct[0],
  });
});

app.get("/api/v1/product/filters/:id", (req, res) => {
  const { id: filter } = req.params;
  console.log(filter);
  const requiredFilter = filters.filter((product) => {
    return product.id === filter;
  });
  return res.json({
    result: requiredFilter[0],
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/order", orderRouter);
app.listen(5000, () => {
  console.log("Server started Listening in App.js Backend");
});
