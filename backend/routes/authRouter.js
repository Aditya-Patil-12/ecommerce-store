const express = require("express");
const router = express.Router();

const {
  signinController,
  logoutController,
  loginController,
} = require('../controllers/authController')

router.post("/login",loginController);
router.post("/signin",signinController);
router.get("/logout",logoutController);

module.exports = router;
