const {
  allUsers,
  singleUser,
  currentUser,
  updateUser,
  updateUserPassword,
  deleteAddress,
} = require("../controllers/userController");

const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
// argument need here is the callback function so we are returning calllback function
router.route("/").get(authenticateUser, authorizePermissions('admin'),allUsers);
// show Me should not be below it 
// because id will be showMe 
router.route("/showMe").get(authenticateUser,currentUser);
router.route("/updateUser").patch(authenticateUser,updateUser);
router.route("/updateUserPassword").patch(authenticateUser,updateUserPassword);
router.route("/deleteUserAddress").delete(authenticateUser, deleteAddress);
router.route("/:id").get(authenticateUser,singleUser);

module.exports = router;