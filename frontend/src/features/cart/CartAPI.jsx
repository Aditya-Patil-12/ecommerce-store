import axios from "../../app/axiosConfig";
const cartServerURL = "/cart";

const getCartItemsByUserId = async (userId) => {
  // *** User.id should be a string ...
  try {
    const cart = await axios.get(cartServerURL + "/showAllMyCartItems");
    return { userCart:cart.data ,success: true };
  } catch (error) {
    return { msg: error.response.payload.msg, success: false };
  }
};
const addToCart = async (itemDetails) => {
  console.log("finally id changed", itemDetails);
  try {
    const resp = await axios.post(cartServerURL, itemDetails);
    console.log("received Item to Cart to Succesfully", resp.data);
    return { product:resp.data, success: true };
  } catch (error) {
    return { msg:error.response.payload.msg, success: false };
  }
};

const updateCartItem = async (updateInfo) => {
  // TODO : update : {userId:,productId:,quantity}
  // *** Update.id should be a string ...
  console.log("in Update Slice ", updateInfo);
  try {
    const resp = await axios.patch(cartServerURL, updateInfo);
    console.log("done update :::::::", resp.data);
    return { msg: "Product Updated Succesfully", success: true };
  } catch (error) {
    return { msg: error.response.payload.msg, success: false };
  }
};

// "http://localhost:5000/api/v1/cart/" + deleteId
const deleteCartItem = async (deleteId) => {
  // *** Update.id should be a string ...
  console.log(deleteId);
  try {
    await axios.delete(cartServerURL+"?id="+deleteId);
    return { msg: "Delete Cart Item successFull", success: true };
  } catch (error) {
    return { msg: error.response.payload.msg, success: false };
  }
};

const deleteCompleteUserCart = async () => {
  // *** Update.id should be a string ...
  try {
    await axios.delete(cartServerURL + "/clearMyCart");
    return {msg:"Complete Cart Deleted Succesfully",success:true};
  } catch (error) {
    return { msg: " delete Cart error", success: false };
  }
};

export {
  addToCart,
  getCartItemsByUserId,
  updateCartItem,
  deleteCartItem,
  deleteCompleteUserCart,
};
