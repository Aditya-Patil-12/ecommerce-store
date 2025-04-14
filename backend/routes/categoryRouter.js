const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  allCategories,
  updateCategory,
} = require("../controllers/categoryController");
router.route("/").get(allCategories).post(addCategory);

router.route("/:id").delete(deleteCategory).patch(updateCategory);

module.exports = router;
