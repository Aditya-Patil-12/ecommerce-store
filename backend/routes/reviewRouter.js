const express = require("express");
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  allReviews,
  getSingleReview,
  uploadImage,
} = require("../controllers/reviewController");
const { authenticateUser } = require("../middleware/authentication");
router.route("/").post([authenticateUser], createReview);
// id -> review id .....
router
  .route("/uploadImage/:id")
  .post([authenticateUser], uploadImage);

// id ->  product for which we need reviews ....
router
  .route("/product/:id")
  .get([authenticateUser], allReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .delete([authenticateUser], deleteReview)
  .patch([authenticateUser], updateReview);

module.exports = router;
