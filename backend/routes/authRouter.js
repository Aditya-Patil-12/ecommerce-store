const express = require("express");
const router = express.Router();

const {
  registerController,
  logoutController,
  loginController,
} = require("../controllers/authController");

router.post("/login",loginController);
router.post("/register", registerController);
router.get("/logout",logoutController);

module.exports = router;
