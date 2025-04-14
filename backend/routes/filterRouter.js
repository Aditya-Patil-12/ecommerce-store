const express = require("express");
const router = express.Router();
const { allFilters } = require("../controllers/filterController");

router.route("/").get(allFilters);

module.exports = router;