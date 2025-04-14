const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");
const CustomError = require("../errors");
const path = require('path');
const Product = require("../models/Product");
const { checkPermissions } = require("../utils");

// user can give a review 
// one review per product

const createReview = async (req, res) => {
  const { userId } = req.user;
  const {product} = req.body;

  if( !product ){
    throw new CustomError.NotFoundError('Please Select for review');
  }
  const isProductPresent = await Product.find({_id:product});
  if( !isProductPresent || (isProductPresent.featured) ){
    throw new CustomError.BadRequestError("Product Selected for Review Does Not exists");
  }
  // check for already existing review for the product by the customer .....
  const gaveReviewAlready = await Review.find({user:userId,product});
  console.log(gaveReviewAlready);
  
  if( gaveReviewAlready.length === 1 ){
    throw new CustomError.BadRequestError(
      "Already Product is Reviewed"
    );
  }
  const reviewInfo = { ...req.body, user: userId };
  const review = await Review.create(reviewInfo);
  return res.status(StatusCodes.CREATED).json(review);
};
// publicly accessible for all
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new CustomError.NotFoundError(
      "No Review Exists with this " + `${id}`
    );
  }

  return res.status(StatusCodes.OK).json(review);
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const review = await Review.findOne({ _id: id });
//   console.log(review);
  
  if (!review) {
    throw new CustomError.NotFoundError(
      "No Review Exists with this " + `${id}`
    );
  }
  // Accessed by Admins &  itself .....
  checkPermissions({requestUser:req.user,resourceUserId:review.user});

  // if (userId !== review.user.toString()) {
  //   throw new CustomError.UnauthorizedError(
  //     "Not Authorize to Delete this Review"
  //   );
  // }
  await Review.findOneAndDelete({_id:id});
  return res.status(StatusCodes.OK).json({msg:"Review Deleted Succesfully"});
};
const updateReview = async (req, res) => {
    const { id } = req.params;
    const {title,rating,comment} = req.body;
    const review = await Review.findOne({ _id: id });
    if (!review) {
      throw new CustomError.NotFoundError(
          "No Review Exists with this " + `${id}`
        );
    }
    checkPermissions({ requestUser: req.user, resourceUserId: review.user });
    let ratingChange = rating-review.rating;
    review.title = title;
    review.rating = rating;
    review.comment = comment;
    await review.save();
    return res.status(StatusCodes.OK).json(review);
};
const uploadImage = async (req, res) => {
  const maxImageSize = ((1024)*(1024));
  if( !req.files ){
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const reviewProductImage = req.files.image;
  if (
    !reviewProductImage.mimetype.startsWith("image") ||
    reviewProductImage.size > maxImageSize
  ) {
    if (reviewProductImage.size > maxImageSize)
      throw new CustomError.BadRequestError(
        "Please Upload Image smaller than 1 MB"
      );
    else throw new CustomError.BadRequestError("Please Upload Image");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${reviewProductImage.name}`
  );
  await reviewProductImage.mv(imagePath);
  return res.status(StatusCodes.OK).json({ msg: "Upload Product Image" });
};
// publicly accessible for all
const allReviews = async (req, res) => {
    // product Id 
    const {id} = req.params;
    try {
        const reviews = await Review.find({ product: id })
          .populate({
            path: "product",
            select: "title brand price _id",
          })
          .populate({
            path: "user",
            select: "name",
          });
        const items = reviews.length;
        res.status(200).json({ data: reviews, items: items });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
module.exports = {
  createReview,
  allReviews,
  getSingleReview,
  deleteReview,
  updateReview,
  uploadImage,
};
