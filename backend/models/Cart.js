const mongoose = require('mongoose'); 


const CartItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "Please Provide Quantity"],
  },
  color: {
    type: String,
    required: [true, "Please Provide Quantity"],
  },
  size: {
    type: String,
    default: "none",
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product", 
    required: true,
  },
});
const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required: true,
  },
  cart:{
    type:[CartItemSchema],
    required:true,
  }
});



module.exports = mongoose.model("Cart", CartSchema);