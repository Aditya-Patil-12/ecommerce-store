const mongoose = require("mongoose");
// Mongoose officially recommends using new when creating schemas.
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide Product Title"],
      maxlength: [100, "Title cannot have more than 100"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Please Provide Price"],
      min: [1, "Price cannot be less than 1"],
      max: [1000000, "Price cannot be less than 1"],
    },
    description: {
      type: String,
      required: [true, "Please Provide Description"],
      maxlength: [10000, "Description cannot have more than 10000"],
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numOfReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    // invetory === stock
    stock: {
      type: Number,
      min: 0,
      required: [true, "Please Provide Stock"],
    },
    brand: {
      type: String,
      default: "None",
    },
    category: {
      type: String,
      required: true,
    },
    shippingAmount: {
      type: Number,
      default: 0,
    },
    // 
    warrantyInformation: {
      type: String,
      required: [true, "Please Provide Warranty Information"],
    },
    thumbnail: {
      type: String,
      //TODO :  think of a default value
      // so admin can just be giving hin
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    // featured === deleted ....
    featured: {
      type: Boolean,
      default: true,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: [String],
      enum: ["Red", "Green", "Blue"],
      default: "Red",
    },
    returnPolicy: {
      type: String,
      required: true,
    },
    taxPercentage: {
      type: Number,
      default: 18,
    },
    // just tell us about the admin which has entered the details for the product ......
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  // excluded _id can be excluded over here also
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// used when do not have the schema in property
ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // count:true,
});

// ProductSchema.pre("delteOne", async function (next) {
//   await this.model("Review").deleteMany({ product: this._id });
// });
// const idVirtual = ProductSchema.virtual("id");
// idVirtual.get(function () {
//   return this._id;
// });
// this is very very important because when toJSON happpns we get to _id and other is id 
ProductSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform:function (doc,ret){
    delete ret._id;
  }
})
module.exports = mongoose.model("Product", ProductSchema);

/*
 {
      "id": "1",
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "rating": 4.94,
      "stock": 5,
      "tags": [
        "beauty",
        "mascara"
      ],
      "brand": "Essence",
      "sku": "RCH45Q1A",
      "weight": 2,
      "dimensions": {
        "width": 23.17,
        "height": 14.43,
        "depth": 28.01
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 1 month",
      "availabilityStatus": "Low Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Very unhappy with my purchase!",
          "date": "2024-05-23T08:56:21.618Z",
          "reviewerName": "John Doe",
          "reviewerEmail": "john.doe@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Not as described!",
          "date": "2024-05-23T08:56:21.618Z",
          "reviewerName": "Nolan Gonzalez",
          "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Very satisfied!",
          "date": "2024-05-23T08:56:21.618Z",
          "reviewerName": "Scarlett Wright",
          "reviewerEmail": "scarlett.wright@x.dummyjson.com"
        }
      ],
      "returnPolicy": "30 days return policy",
      "minimumOrderQuantity": 24,
      "meta": {
        "createdAt": "2024-05-23T08:56:21.618Z",
        "updatedAt": "2024-05-23T08:56:21.618Z",
        "barcode": "9164035109868",
        "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
      ],
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      "deleted": false
    },
*/
