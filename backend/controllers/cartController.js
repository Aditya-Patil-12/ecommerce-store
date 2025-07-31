const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/Cart");
const CustomError = require("../errors");
const path = require('path');
const {calculateProductCosting} =require('../utils') ;

const createCart = async (id)=>{
  const resp = await Cart.create({ user: id, cart: [] }); 
  return resp;
}

const currentUserCart = async (req, res) => {
  const {userId} = req.user;
  const isCartExists = await Cart.exists({ user: userId });
  if (!isCartExists) {
    const newCart = await createCart(userId);
    return res.status(StatusCodes.CREATED).json(newCart);
  }
  const userCart = await Cart.findOne({ user: userId }).populate("cart.product");
  return res.status(StatusCodes.OK).json(userCart);
};

// adds a new Item to a given cartItem ....
const addToCart = async (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  
  const { userId } = req.user;
  const isCartExists = await Cart.exists({ user: userId });
  if (!isCartExists) {
    createCart(userId);
  }
  const userCart = await Cart.findOne({ user: userId });

  const isProductAlreadyInCart = userCart.cart.findIndex(
    (cartProduct) => newProduct.product === cartProduct.product.toString()
  );
  console.log(isProductAlreadyInCart,"   Please check");
  
  if (isProductAlreadyInCart !== -1 ){
    throw new CustomError.BadRequestError("Product Already Exist in Cart");
  }
  const { itemSubTotal, itemTaxAmount, itemShippingAmount } = newProduct;
  await userCart.cart.push({...newProduct});
  await (userCart.totalAmount =
    userCart.totalAmount + itemSubTotal + itemTaxAmount + itemShippingAmount);
  await (userCart.subTotal = userCart.subTotal + itemSubTotal);
  await (userCart.totalTaxAmount = userCart.totalTaxAmount + itemTaxAmount);
  await (userCart.totalShippingAmount =
    userCart.totalShippingAmount + itemShippingAmount);
  await userCart.save();

  const updatedUserCart = await Cart.findOne({ user: userId }).populate(
    "cart.product"
  );
  console.log(updatedUserCart.cart.at(-1));  
  return res.status(StatusCodes.CREATED).json(updatedUserCart.cart.at(-1));
};
const deleteCartItem = async (req, res) => {
  const {id:deleteProductId} = req.query;
  console.log(req.query);
  
  const { userId } = req.user;
  const isCartExists = await Cart.exists({ user: userId });
  if (!isCartExists) {
    throw new CustomError.NotFoundError(
      "No Cart Exist for use with id " + userId
    );
  }
  const userCart = await Cart.findOne({ user: userId });
  const isProductAlreadyInCart = userCart.cart.findIndex(
    (cartProduct) => deleteProductId === cartProduct.product.toString()
  );
  console.log(isProductAlreadyInCart);
  if (isProductAlreadyInCart === -1) {
    throw new CustomError.BadRequestError(
      "No Product Exist with Id",
      deleteProductId
    );
  }
  let {itemSubTotal,itemTaxAmount,itemShippingAmount} =userCart.cart[isProductAlreadyInCart];
  let _itemSubTotal = itemSubTotal,
    _itemTaxAmount = itemTaxAmount,
    _itemShippingAmount = itemShippingAmount;
  await (userCart.subTotal -= _itemSubTotal);
  await (userCart.totalTaxAmount -= _itemTaxAmount);
  await (userCart.totalShippingAmount -= _itemShippingAmount);
  await (userCart.totalAmount -=
    (itemSubTotal+ itemTaxAmount+ itemShippingAmount));
  await userCart.cart.splice(isProductAlreadyInCart,1);
  await userCart.save();
  return res.status(StatusCodes.OK).json({ msg:"Product Deleted SuccessFully" });
};
const updateCartItem = async (req, res) => {
  const updateProduct = (req.body);
  console.log("This is the product to be Updated ", updateProduct);
  const { userId } = req.user;
  const isCartExists = await Cart.exists({ user: userId });
  if (!isCartExists) {
    throw new CustomError.NotFoundError(
      "No Cart Exist for user with id " + userId
    );
  }
  const userCart = await Cart.findOne({ user: userId }).populate(
    "cart.product"
  );;
  console.log("this is the userCart ::::  ",userCart);
  const isProductAlreadyInCart = userCart.cart.findIndex(
    (cartProduct) => updateProduct.product.toString() === cartProduct.product._id.toString()
  );
  console.log("The product is present at index ::: ",isProductAlreadyInCart)
  if (isProductAlreadyInCart === -1) {
    throw new CustomError.BadRequestError(
      "No Product Exist with Id",
      updateProduct
    .id);
  }
  const tempUserCart = await Cart.findOne({ user: userId });
  const changedProduct = userCart.cart[isProductAlreadyInCart];
  console.log("The required product Info ", changedProduct);
  const newCosting =
    calculateProductCosting({
      ...changedProduct.product._doc,
      quantity: updateProduct.quantity,
  });
  console.log("Calculation Updating Values ... ",newCosting);
  const { itemSubTotal, itemTaxAmount, itemShippingAmount } = newCosting; 
  const delSubTotal = itemSubTotal-(changedProduct.itemSubTotal);
  const delTaxAmount = itemTaxAmount - (changedProduct.itemTaxAmount);
  const delShippingAmount =
    itemShippingAmount - changedProduct.itemShippingAmount;


  const temp = {
    ...updateProduct,
    ...newCosting,
  };
  console.log("Started Updating ....");

  await (tempUserCart.cart[isProductAlreadyInCart]=  temp);
  await (tempUserCart.subTotal =(tempUserCart.subTotal  + delSubTotal));
  await (tempUserCart.totalTaxAmount = tempUserCart.totalTaxAmount + delTaxAmount);
  await (tempUserCart.totalShippingAmount = tempUserCart.totalShippingAmount + delShippingAmount);
  await (tempUserCart.totalAmount = tempUserCart.totalAmount + delShippingAmount + delTaxAmount + delSubTotal);
  await tempUserCart.save();

  console.log("Ok now moving to fetch updated User Cart sending to frontend ")
  const updatedUserCart = await Cart.findOne({ user: userId }).populate(
    "cart.product"
  );
  return res.status(StatusCodes.OK).json({
    item: updatedUserCart.cart[isProductAlreadyInCart],
    delSubTotal,
    delTaxAmount,
    delShippingAmount,
    quantity : updateProduct.quantity
  });
};

const clearCompleteCart = async (req,res) =>{
  const { userId } = req.user;
  console.log(userId);
  const isCartExists = await Cart.exists({ user: userId });
  if (!isCartExists) {
    throw new CustomError.NotFoundError(
      "No Cart Exist for use with id " + userId
    );
  }
  await Cart.deleteOne({ user: userId });
  return res.status(StatusCodes.OK).json({msg:"Cart Delte Succesfully",success:true});
}
const clearCompleteCartHelper = async (req,res) =>{
  const { userId } = req.user;
  console.log(userId);
  const isCartExists = await Cart.exists({ user: userId });
  if (!isCartExists) {
    throw new CustomError.NotFoundError(
      "No Cart Exist for use with id " + userId
    );
  }
  await Cart.deleteOne({ user: userId });
  // return res.status(StatusCodes.OK).json({msg:"Cart Delte Succesfully",success:true});
}
module.exports = {
  currentUserCart,
  addToCart,
  deleteCartItem,
  updateCartItem,
  clearCompleteCart,
  clearCompleteCartHelper,
};
