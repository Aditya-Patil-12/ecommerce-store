const express = require('express');

const router = express.Router();
const {updateCartItem,currentUserCart,addToCart,deleteCartItem,clearCompleteCart} = require('../controllers/cartController');
const {authenticateUser} = require('../middleware/authentication')
router.route("/showAllMyCartItems").get([authenticateUser],currentUserCart);
router.route("/clearMyCart").delete([authenticateUser], clearCompleteCart);
router
  .route("/")
  .post([authenticateUser], addToCart)
  .patch([authenticateUser], updateCartItem)
  .delete([authenticateUser], deleteCartItem);
module.exports = router;
