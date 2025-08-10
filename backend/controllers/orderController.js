require("dotenv").config();
const {
  calculateDiscountedAmount,
  calculateTotalOrderCosting,
  calculatePercentageAmount,
} = require("../utils");
const Order = require("../models/Order");
const Product = require("../models/Product");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { clearCompleteCartHelper } = require("../controllers/cartController");
const { checkPermissions } = require("../utils");
const RazorPay = require("razorpay");
const {
  validateWebhookSignature,
  validatePaymentVerification
} = require("../node_modules/razorpay/dist/utils/razorpay-utils");

const generateRazorPayInstance = () => {
  console.log(process.env.PAYMENT_KEY_ID, " ", process.env.PAYMENT_KEY_SECRET);
  const razorpayIntent = new RazorPay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET,
  });
  return razorpayIntent;
};

const createOrder = async (req, res) => {
  const { userId } = req.user;
  const {
    orderItems: cartItems,
    paymentType,
    shippingAddress,
    totalTaxAmount,
    totalShippingAmount,
    subTotal,
    total,
  } = req.body;

  // console.log("Check the req.body : ", req.body);
  // =====> 1) check cartItems and recalculate the total SubtTotal taxAmout and ShippingAmount ...
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
    // console.log(quantity," ",product);

    const dbProduct = await Product.findOne({ _id: product.id });
    // console.log(dbProduct);

    if (!dbProduct || !dbProduct.featured) {
      throw new CustomError.NotFoundError(
        `No Product Found with id ${cartProduct.product.id}`
      );
    }
    const netAmount =
      calculateDiscountedAmount(dbProduct.price, dbProduct.discountPercentage) *
      quantity;
    orderItems.push({
      quantity,
      netAmount,
      shippingAmount: quantity * dbProduct.shippingAmount,
      taxAmount: calculatePercentageAmount(netAmount, dbProduct.taxPercentage),
      product: cartProduct.product.id,
    });
  }

  const { _total, _subTotal, _totalTaxAmount, _totalShippingAmount } =
    calculateTotalOrderCosting(orderItems);

  console.log("Original Matter \n",
    _total,
    " ",
    _subTotal,
    " ",
    _totalTaxAmount,
    " ",
    _totalShippingAmount
  );
  console.log(
    total,
    " ",
    subTotal,
    " ",
    totalTaxAmount,
    " ",
    totalShippingAmount
  );

  // if((totalTaxAmount !== _totalTaxAmount) ||
  //   (totalShippingAmount !== _totalShippingAmount) ||
  //   (subTotal !== _subTotal) ||
  //   (total !== _total)  ){
  //     throw new CustomError.BadRequestError("Invalid Product Request");
  // }

  // ====> 2) create a Order Intent with Razorpay....
  const orderOptions = {
    // amount x => x/100 rupees
    amount: Math.floor(_total * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  const razorPay = generateRazorPayInstance();
  let orderIntentInfo = null;
  await razorPay.orders.create(orderOptions, (err, order) => {
    console.log(err);
    if (err) {
      orderIntentInfo = {
        statusCode: err.statusCode,
        msg: err.error.description,
        error: true,
      };
      return;
    }
    orderIntentInfo = { order, error: false };
    // we can directly return the res.json() from here only it works
    return;
  });
  console.log("This is Razor Pay response ::: ", orderIntentInfo);
  if (orderIntentInfo.error) {
    return res
      .status(orderIntentInfo.statusCode)
      .json({ msg: orderIntentInfo.msg, success: false });
  }
  console.log(orderIntentInfo);

  // ====>  4) Create the Order for your Server
  let order = await Order.create({
    paymentType,
    user: userId,
    paymentIntentId: orderIntentInfo.order.id,
    clientSecret: process.env.PAYMENT_KEY_ID,
    orderItems,
    shippingAddress,
  });

  console.log("Created Order Object ::: ", order);

  return res.status(StatusCodes.CREATED).json(order);
};

const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.PAYMENT_KEY_SECRET;
  if( !order_id || !payment_id || !signature ){
    throw new ApiError("Please Provide All Details");
  }
  if (validatePaymentVerification({ order_id, payment_id },signature,secret)) {
    const order = await Order.findOne({ paymentIntentId: order_id });
    order.paymentState = "captured";

    await order.save();
    // 2) order succesfull delete user cart ...
    clearCompleteCartHelper(req, res);

    // 3) for all Products fetch user ke items
    // for (let item of order.orderItems) {
    //   console.log(item.product);
    //   const product = await Product.findOne({ _id: item.product });
    //   product.stock -= item.quantity;
    //   await product.save();
    // }
    return res.status(200).json(order);
  } else {
    // payment Failed
    return res
      .status(400)
      .json({ msg: "Payment not verified", success: false });
  }
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
  console.log(orderId, " ", status);
  
  const order = await Order.findOneAndUpdate({ _id: orderId }, { status });
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
// not publically accessible for all
const allOrders = async (req, res) => {
  console.log("hey there");
  const query = req.query;
  console.log(query);
  const limitOrders = +req.query._per_page;
  const page = +req.query._page;
  const id = req.query._id;
  console.log(id);
  try {
    const orders = id
      ? await Order.aggregate([
          {
            $match: {
              $expr: {
                $regexMatch: {
                  input: { $toString: "$_id" },
                  regex: `^${id}`,
                },
              },
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $lookup: {
              from: "products",
              localField: "orderItems.product",
              foreignField: "_id",
              as: "orderItems.productDetails",
            },
          },
          {
            $unwind: "$orderItems.productDetails",
          },
          {
            $group: {
              _id: "$_id",
              orderItems: {
                $push: "$orderItems",
              },
              otherFields: { $first: "$$ROOT" }, 
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  "$otherFields",
                  { orderItems: "$orderItems" },
                ],
              },
            },
          },
          { $skip: (page - 1) * limitOrders },
          { $limit: limitOrders },
        ])
      : (
          await Order.find({})
            .skip((page - 1) * limitOrders)
            .limit(limitOrders).populate({
          path: "orderItems.product",
          select:"thumbnail title brand category price"
        }));
    console.log("Hey the orders are ::::",orders);

    const totalItems = (id) ? (await Order.aggregate([
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: { $toString: "$_id" },
              regex: `^${id}`,
            },
          },
        },
      },
      { $count: "total" },
    ])):(await Order.countDocuments({}));

    const items = (Number.isInteger(totalItems) && totalItems) || (totalItems[0]?.total || 0);

    if( req.query._sort  ){
      orders.sort((order1,order2)=>{
        let isDescending = req.query._sort.startsWith("-");
        let sortField = isDescending
        ? req.query._sort.slice(1)
        : req.query._sort;
        if (isDescending) {
          return order2[sortField] - order1[sortField]; 
        } else {
          return order1[sortField] - order2[sortField]; 
        }
      })
    } 
    console.log(page," ",limitOrders ,orders);
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
  verifyPayment,
};
