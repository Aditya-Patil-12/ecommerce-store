const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { clearCompleteCart } = require("../controllers/cartController");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
// const { calculateDiscountedAmount } = require("../utils");
// const {SelectedProduct} = require('../models/basic')
const fakeStripeAPI = ({ amount, currency }) => {
  const client_secret = "some Random Value";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  
  const {
    orderItems: cartItems,
    paymentType,
    shippingAddress,
    totalTaxAmount,
    totalShippingAmount,
    subTotal,
    total,
  } = req.body;

  console.log(req.body);
  // 1) chek order items and place the order that's it .......
  if (!cartItems || cartItems.length == 0) {
    throw new CustomError.NotFoundError("Please select Products for Order");
  }
  if (!paymentType) {
    throw new CustomError.NotFoundError("Please select Payment Type");
  }
  if (!shippingAddress) {
    throw new CustomError.NotFoundError("Please provide a for Shipping");
  }
  // check for whethere there exists all Products for delivery .....

  let orderItems = [];
  for (let cartProduct of cartItems) {
    const { quantity, product } = cartProduct;
    console.log(quantity," ",product);
    
    const dbProduct = await Product.findOne({ _id: product.id });
    console.log(dbProduct);

    if (!dbProduct || !dbProduct.featured) {
      throw new CustomError.NotFoundError(
        `No Product Found with id ${cartProduct.product.id}`
      );
    }
    orderItems.push({ quantity, product:cartProduct.product.id });    
  }
  const order = await Order.create({
    paymentType,
    user: userId,
    orderItems,
    shippingAddress,
  });

  // if(
  //   (order.totalTaxAmount !== totalTaxAmount) ||
  //   (order.totalShippingAmount !== totalShippingAmount) ||
  //   (order.subTotal !== subTotal) ||
  //   (order.total !== total)  ){
  //     throw new CustomError.BadRequestError("Invalid Product Request");
  // }
  // 2) order succesfull delete user cart ...
  // clearCompleteCart(req,res);

  // 3) for all Products fetch user ke items 
  for(let item of orderItems){
    console.log(item.product);
    const product = await Product.findOne({_id:item.product});
    product.stock -= item.quantity;
    await product.save();
  }
  return res.status(StatusCodes.CREATED).json(order);
};
const currentUserOrders = async (req, res) => {
  const id = req.user.userId;

  const orders = await Order.find({ user: id }).populate({
    path: "orderItems.product",
    select:
      "title thumbnail quantity price discountPercentage shippingAmount taxPercentage",
  });
  console.log(orders);
  if (!orders) {
    throw new CustomError.NotFoundError(
      "No Orders Exists for User with Id " + `${id}`
    );
  }
  const items = orders.length;
  return res.status(StatusCodes.OK).json({ orders, items });
};
// publicly accessible for all
const singleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new CustomError.NotFoundError("No Orders Exists for Id " + `${id}`);
  }
  const realUserOrder = order.user;
  checkPermissions({ requestUser: req.user, resourceUserId: realUserOrder });
  return res.status(StatusCodes.OK).json(order);
};

// admin only can update order
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  // const { paymentIntentId } = req.body;
  const { status } = req.body;
  const order = await Order.findOneAndUpdate({ _id: orderId },{status});
  if (!order) {
    throw new CustomError.NotFoundError("No Order Exists with this " + `${id}`);
  }
  // order.paymentIntentId = paymentIntentId;
  // orderIsPaid = true
  // add order.type:cash ,  card
  // order.status = status;
  // await order.save();
  return res.status(StatusCodes.OK).json(order);
};
// not publicly accessible for all
const allOrders = async (req, res) => {
  console.log("hey there");
  try {
    const orders = await Order.find({});
    const items = orders.length;
    res.status(200).json({ data: orders, items: items });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
module.exports = {
  createOrder,
  allOrders,
  singleOrder,
  updateOrder,
  currentUserOrders,
};


