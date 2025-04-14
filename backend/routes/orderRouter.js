const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  singleOrder,
  createOrder,
  currentUserOrders,
  updateOrder,
  allOrders,
} = require("../controllers/orderController");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], allOrders)
  .post([authenticateUser], createOrder);

// this is above
router.route("/showAllMyOrders").get([authenticateUser], currentUserOrders);

router
  .route("/:id")
  .get([authenticateUser], singleOrder)
  .patch([authenticateUser, authorizePermissions("admin")], updateOrder);

module.exports = router;
