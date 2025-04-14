const express = require("express");
const router = express.Router();
const {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { authorizeProduct } = require("../middleware/authentication");

// Learnings ====>
// allProducts and Single Products do not even need a Cookie .......
// [middleware1,middleware2,middleware3] -> is important 
// as it helps to add additional middleware dynamically 

// in get All Products Remember that admin will get all Products irrespective of featured
// other roles will see only non featured ones ....
router
  .route("/")
  // .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .post([authenticateUser, authorizePermissions('admin')],createProduct)
  .get([authenticateUser], allProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct);

module.exports = router;
