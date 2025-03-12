import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCartItem,
  getItemsByUserId,
  deleteCartItem,
  deleteCompleteUserCart,
} from "./CartAPI";

const initialState = {
  cart: [],
  amount: 0,
  totalItems: 0,
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartDetails",
  async (itemDetails) => {
    console.log(itemDetails);
    delete itemDetails['id'];
    console.log(itemDetails);
    const resp = await addToCart(itemDetails);
    if (resp.success) {
      return {
        msg: "Add to Cart Async Success",
        item: resp.items,
        success: true,
      };
    }
    return { msg: "Add to Cart Async Failed", success: false };
  }
);

export const fetchUserItemsAsync = createAsyncThunk(
  "cart/fetchUserItemsDetails",
  async (userId) => {
    console.log("Entering to Fetching User Items");
    
    const resp = await getItemsByUserId(userId);
    const { items, success } = resp;
    console.log("the items are ", resp);
    if (!success) {
      return { msg: "Fetch User Cart Failure", success: false };
    }
    return { items: items,success: true };
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemDetails",
  async (updateItem) => {
    console.log("check",updateItem);
    
    const resp = await updateCartItem({...updateItem.item,quantity:updateItem.newQuantity});
    if (resp.success) {
      return  {
        msg: "Update Item Success",
        updatedCost:((+updateItem.newQuantity) - (+updateItem.item.quantity)) * updateItem.item.price,
        updatedItems: (+updateItem.newQuantity) - (+updateItem.item.quantity),
        updatedQuantity: updateItem.newQuantity,
        id: updateItem.item.id,
        success: true,
      };
    }
    return  { msg: "Update Item Failed", success: false };
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItemDetails",
  async (item) => {
    console.log("enterd deleting ",item);
    
    const resp = await deleteCartItem(item.id);
    console.log(resp);
    console.log({
        msg: "Delete Item Success",
        ...item,
        success: true,
    });
    console.log(resp); 
    if (resp.success) {
      return {
        msg: "Delete Item Success",
        ...item,
        success: true,
      };
    }
    return { msg: "Delete Item Failed", success: false };
  }
);

export const deleteCompleteUserCartAsync = createAsyncThunk(
  "cart/deleteCompleteUserCartDetails",
  async (userId) => {
    const resp = await deleteCompleteUserCart(userId);
    if (resp.success) {
      return {
        msg: "Delete Success",
        success: true,
      };
    }
    return { msg: "Delete Cart Failed", success: false };
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart=[];
      state.amount=0;
      state.totalItems=0;
      state.status="idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("adding your product", action.payload);
        const { item } = action.payload;
        state.cart.push(item);
        state.amount = state.amount + +item.quantity * item.price;
        state.totalItems += +item.quantity;
      })
      .addCase(fetchUserItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const { items } = action.payload;
        console.log("here the items are", items);
        state.cart = items;
        state.amount = items.reduce((prev, item) => {
          return prev + +item.quantity * item.price;
        }, 0);
        state.totalItems = items.reduce(
          (prev, item) => prev + +item.quantity,
          0
        );
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        console.log(state.cart);

        const { id, updatedItems, updatedCost, updatedQuantity } =
          action.payload;
        state.amount += updatedCost;
        state.totalItems += updatedItems;

        const index = state.cart.findIndex((item) => {
          if (item.id === id) {
            item.quantity = updatedQuantity;
          }
          return item.id === id;
        });

        state.cart[index].quantity = updatedQuantity;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";

        console.log("delete payload: ", action.payload);
        const { updateByAmount, updateByItem, id } = action.payload;
        state.amount += updateByAmount;
        state.totalItems += updateByItem;
        const index = state.cart.findIndex((item) => item.id === id);
        console.log("this is the index:", index);
        state.cart.splice(index, 1);
      })
      .addCase(deleteCompleteUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCompleteUserCartAsync.fulfilled, (state, action) => {
        console.log("At the right Place",action.payload);
        if( action.payload.success ){
          state.cart=[];
          state.amount=0;
          state.totalItems=0;
        }
        state.status = "idle";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
