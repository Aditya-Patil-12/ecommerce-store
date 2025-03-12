import { default as axios } from "axios";

const addToCart = async (itemDetails) => {
  console.log("finally id changed",itemDetails);
  let resp;
  try {
     resp = await axios.post(
      // "http://localhost:5000/api/v1/order/singleOrder"
      "http://localhost:5000/cart",
      {
        ...itemDetails,
      }
    );
    console.log("received Item to Cart to Succesfully", await resp.data);
    return { msg: "Add to Cart Success",items:resp.data,success: true };
  } catch (error) {
    return { msg: "Add to Cart Failed", success: false };
  }
};

const getItemsByUserId = async (userId) => {
  // *** User.id should be a string ...
  let items = null;
  console.log("Yes over here");
  
  try {
    items = await axios.get(
      // "http://localhost:5000/api/v1/cart?user=" + userId
      "http://localhost:5000/cart?userId=" + userId
    );
    console.log("ok",items);
    
    console.log("received ", await items.data[0]);
    return { msg: "Fetch Items SuccessFull", items: items.data, success: true };
  } catch (error) {
    return { msg: "Fetch User Items By Id Failed", success: false };
  }
};

const updateCartItem = async (update) => {
  // TODO : update : {userId:,productId:,quantity}
  // *** Update.id should be a string ...
  console.log("in Update Slice ", update);
  try {
    const resp = await axios.patch(
      // "http://localhost:5000/api/v1/cart/" + update.id
      "http://localhost:5000/cart/" + update.id, 
       update,
    );
    // console.log("done update",resp);
    return await { msg: "Update Carts successFull", success: true };
  } catch (error) {
    return await { msg: " update Cart errror", success: false };
  }
};

// "http://localhost:5000/api/v1/cart/" + deleteId
const deleteCartItem = async (deleteId) => {
  // *** Update.id should be a string ...
  console.log(deleteId);
  try {
    const resp = await axios.delete(
      "http://localhost:5000/cart/" + deleteId
    );
    return { msg: "Delete Cart Item successFull", success: true };
  } catch (error) {
    return { msg: " delete Cart Item error", success: false };
  }
  console.log("delete done update");
};

const deleteCompleteUserCart = async (userId) => {
  // *** Update.id should be a string ...
  console.log(userId);
  
  try {
    const userCart = await getItemsByUserId(userId);
    for( let item of await userCart.items ){
      await deleteCartItem(item.id);
    }
    return { msg: "Delete Cart successFull", success: true };
  } catch (error) {
    return { msg: " delete Cart error", success: false };
  }
  console.log("delete done update");
};

export {
  addToCart,
  getItemsByUserId,
  updateCartItem,
  deleteCartItem,
  deleteCompleteUserCart,
};
