const mongoose = require("mongoose");
// Mongoose officially recommends using new when creating schemas.
const ReviewSchema =  mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please Provide Rating"],
    },
    title: {
      type: String,
      required: [true, "Please Review Title"],
      maxLength: 100,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
ReviewSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  console.log("We are here, the product ID:", doc.product);
  const productId = doc.product;

  // ✅ Use `mongoose.model("Review")` instead of `this.model("Review")`
  const result = await mongoose.model("Review").aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    // ✅ Use `mongoose.model("Product")` instead of `this.model("Product")`
    await mongoose.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log("Error updating product:", error);
  }

  console.log("Final result:", result);
});

ReviewSchema.post("save", async function () {
  console.log("we are here the product id", this.product);

  const result = await this.constructor.aggregate([
    {
      $match: {
        product: this.product,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: this.product },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }

  console.log("final result", result);
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
