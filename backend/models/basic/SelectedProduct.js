// const mongoose = require("mongoose");
// const {calculateDiscountedAmount} = require('../../utils');
// const selectedProductSchema = new mongoose.Schema({
//   // price included tax Included ......
//   netAmount: { type: Number },
//   taxAmount: { type: Number },
//   quantity : { type:Number , required:true },
//   // title , thumbnail, quantity, price, discountPercentage , shippingAmount,
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
// });
// selectedProductSchema.pre("validate", async function (next) {
//   await this.populate({
//     path: "product",
//     select: "title thumbnail quantity price discountPercentage shippingAmount taxPercentage",
//   });
//   this.netAmount = calculateDiscountedAmount(
//     +this.product.price,
//     +this.product.discountPercentage
//   )*(+this.product.quantity);
//   this.taxAmount = calculateDiscountedAmount(
//     +this.netAmount,
//     (100)-(+this.product.taxPercentage)
//   );
//   next();
// });
// module.exports = mongoose.model('SelectedProduct',selectedProductSchema);

// // we can populate the shipping fee and discount Percentage .... but the Prices , Shipping Amount , Taxing Amount Can Vary Right

// // populate thumbnail ....

// /*
//   title: { type: String, required: true },
//   thumbnail: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   price: { type: Number, required: true },
//   discountPercentage: { type: Number, required: true },
//   shippingAmount: { type: Number, required: true },
//   taxPercentage: { type: Number, required: true },

// */
