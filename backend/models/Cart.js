const mongoose = require('mongoose'); 


const CartItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "Please Provide Quantity"],
  },
  color: {
    type: String,
    required: [true, "Please Provide Color"],
  },
  size: {
    type: String,
    default: "none",
  },
  itemSubTotal: { type: Number, default: 0 },
  itemTaxAmount: { type: Number, default: 0 },
  itemShippingAmount: { type: Number, default: 0 },
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
  },
  totalAmount :{
    type : Number , 
    default: 0,
  },
  subTotal : {
    type : Number , 
    default: 0,
  },
  totalTaxAmount :{
    type : Number , 
    default: 0,
  },
  totalShippingAmount:{
    type : Number , 
    default: 0,
  },
});

module.exports = mongoose.model("Cart", CartSchema);