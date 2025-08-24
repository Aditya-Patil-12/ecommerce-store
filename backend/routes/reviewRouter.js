const express = require("express");
const upload = require('../middleware/multer');
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  allReviews,
  getSingleReview,
  uploadImage,
  getUserReviews,
} = require("../controllers/reviewController");
const { authenticateUser } = require("../middleware/authentication");
router.route("/").post([authenticateUser], upload.array("images",12),createReview).get([authenticateUser],getUserReviews);
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
