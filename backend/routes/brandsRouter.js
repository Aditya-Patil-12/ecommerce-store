const express = require("express");
const router = express.Router();
const {
  addBrand,
  deleteBrand,
  allBrands,
  updateBrand,
} = require("../controllers/brandController");
router.route("/").get(allBrands).post(addBrand);

router.route("/:id").delete(deleteBrand).patch(updateBrand);


module.exports = router;