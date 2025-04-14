const mongoose = require("mongoose");
const { AddressSchema } = require("./basic");
const { calculateDiscountedAmount } = require("../utils");
const OrderSchema = mongoose.Schema(
  {
    // default
    // for compelte Order
    totalTaxAmount: {
      type: Number,
      default: 0,
    },
    // fee is same for any quantity of the respective Products
    totalShippingAmount: {
      type: Number,
      default: 0,
    },
    // will be without having the total tax and Shipping Fee for products ==>
    // with discounted Price ===>
    subTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    orderItems: {
      type: [
        {
          // price included tax Included ......
          netAmount: { type: Number, default: 0 },
          taxAmount: { type: Number, default: 0 },
          quantity: { type: Number, required: true },
          product: {
            // title , thumbnail, quantity, price, discountPercentage , shippingAmount,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],
      required: true,
    },
    status: {
      type: String,
      values: ["Pending", "Dispatched", "Delivered", "Cancelled"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    shippingAddress: {
      type: AddressSchema,
      required: [true, "Please Provide Order Address"],
    },
    clientSecret: {
      type: String,
      default: "",
      // required: true,
    },
    // is Ready to Pay or not ....
    paymentIntentId: {
      type: String,
      default: "",
      // required: true,
    },
  },
  { timestamps: true }
);
OrderSchema.pre("save", async function (next) {
  // if( !this.isModified("orderItems") ) return ;
  await this.populate({
    path: "orderItems.product",
    select:
      "title thumbnail quantity price discountPercentage shippingAmount taxPercentage",
  });
  next();
});
OrderSchema.pre("save", async function (next) {
  // update the indiviuval netAmount Tax Amount
  this.orderItems.forEach((item) => {
    item.netAmount =
      calculateDiscountedAmount(
        +item.product.price,
        +item.product.discountPercentage
      ) * +item.quantity;
    item.taxAmount = calculateDiscountedAmount(
      +item.netAmount,
      100 - (+item.product.taxPercentage)
    );
    this.totalTaxAmount += item.taxAmount;
    this.totalShippingAmount += item.shippingAmount;
    this.subTotal += item.netAmount;
  });
  this.total +=
    this.totalShippingAmount + this.totalTaxAmount + this.subTotal;
  next();
});
module.exports = mongoose.model("Order", OrderSchema);



/*

const SingleOrderItemSchema = mongoose.Schema({
  // price included tax Included ......
  title: { type: String, required: true },
  // thumbnail: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  shippingAmount: { type: Number, required: true },
  netAmount:{type:Number,required:true},
  taxPercentage:{type:Number,required:true},
  taxAmount:{type:Number,required:true},
  // we can populate the shipping fee and discount Percentage .... but the Prices , Shipping Amount , Taxing Amount Can Vary Right

  // populate thumbnail ....
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
}); 
*/
