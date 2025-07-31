import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCartItem,
  getCartItemsByUserId,
  deleteCartItem,
  deleteCompleteUserCart,
} from "./CartAPI";

import calculateProductCosting from "../../utils/calculateProductCosting";
const initialState = {
  cart: [],
  totalAmount: 0,
  subTotal: 0,
  totalTaxAmount: 0,
  totalShippingAmount: 0,
  totalItemsCnt:0,
  totalQuantity:0,
  status: "idle",
};

export const fetchUserItemsAsync = createAsyncThunk(
  "cart/fetchUserItemsDetails",
  async () => {
    console.log("Entering to Fetching User Items");
    return await getCartItemsByUserId();
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartDetails",
  async (itemDetails) => {
    console.log("Add to Cart Details ::: ",itemDetails);
    return await addToCart(itemDetails);
  }
);


export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemDetails",
  async (updateItem) => {
    console.log("check",updateItem);
    const {product ,_id , ...restInfo } = updateItem.item;
    const { newQuantity } = updateItem;


    const resp = await updateCartItem({
      ...restInfo,
      quantity:newQuantity,
      product: product.id,
    });
    console.log(resp);
    
    return resp;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItemDetails",
  async (item) => {
    console.log("enterd deleting in SLice :::, ",item);
    const resp = await deleteCartItem(item.product.id);
    console.log("Server gave response :::, ", resp);
    console.log({
        msg: "Delete Item Success",
        ...item,
        success: true,
    });
    return { product:item , ...resp };
  }
);

export const deleteCompleteUserCartAsync = createAsyncThunk(
  "cart/deleteCompleteUserCartDetails",
  async (userId) => {
    return await deleteCompleteUserCart();
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart=[];
      state.status="idle";
      state.totalAmount=0;
      state.subTotal=  0;
      state.totalTaxAmount= 0;
      state.totalShippingAmount= 0;
      state.totalItemsCnt=0;
      state.totalQuantity=0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Fufilled Adding to Cart Your Product", action.payload);
        const { success } = action.payload;
        if (success) {
          const item = action.payload.product;
          state.cart.push(item);
          state.subTotal = state.totalTaxAmount + item.itemSubTotal;
          state.totalTaxAmount = state.totalTaxAmount + item.itemTaxAmount;
          state.totalShippingAmount =
            state.totalShippingAmount + item.itemShippingAmount;
          state.totalAmount =
            state.totalAmount +
            (item.itemSubTotal + item.itemTaxAmount + item.itemShippingAmount);
          state.totalItemsCnt = state.totalItemsCnt + 1;
          state.totalQuantity = (state.totalQuantity )+ (+item.quantity);
        }
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = "idle";
      })
      // Fetch Cart Items ==========================
      .addCase(fetchUserItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserItemsAsync.fulfilled, (state, action) => {
        const { success } = action.payload;
        console.log("Check the cart", action.payload);
        if (success) {
          const {totalAmount,subTotal,totalTaxAmount,totalShippingAmount} = action.payload.userCart;
          let items = action.payload.userCart.cart;
          state.cart = items;
          state.totalAmount = totalAmount;
          state.subTotal = subTotal;
          state.totalTaxAmount = totalTaxAmount;
          state.totalShippingAmount = totalShippingAmount;
          state.totalQuantity = items.reduce(
            (prev, item) => prev + +item.quantity,
            0
          );
          state.totalItemsCnt = items.length;
        }
        state.status = "idle";
      })
      // =====================================>

      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Here is the action.payload ", action.payload);
        console.log(state.cart);
        const { success } = action.payload;
        
        if (success) {
          const {
            item,
            quantity,
            delShippingAmount,
            delSubTotal,
            delTaxAmount,
          } = action.payload;
          state.subTotal = state.subTotal + delSubTotal;
          state.totalTaxAmount = state.totalTaxAmount + delTaxAmount;
          state.totalShippingAmount =
            state.totalShippingAmount + delShippingAmount;
          state.totalAmount =
            state.totalAmount + delSubTotal + delTaxAmount + delShippingAmount;
          state.totalQuantity = quantity;
        
          const index = state.cart.findIndex((currItem) => {
            return currItem.product.id === item.product.id;
          });
          state.cart[index] = item;
        }
      })
      .addCase(updateCartItemAsync.rejected, (state) => {
        state.status = "idle";
      })
      // * delte Cart Item ===================>
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        console.log("delete payload: ", action.payload);
        const {  success } = action.payload;
        if (success) {
          const {itemSubTotal,itemTaxAmount,itemShippingAmount,quantity} = action.payload.product;
          const {id} = action.payload.product.product;
          console.log({
            itemSubTotal,
            itemTaxAmount,
            itemShippingAmount,
            quantity,
          }," ",state.totalAmount," ",state.subTotal," ",state.totalTaxAmount," ",state.totalShippingAmount);
          
          state.totalAmount -= (itemSubTotal+itemTaxAmount + itemShippingAmount);
          state.subTotal -=(itemSubTotal);
          state.totalTaxAmount -= itemTaxAmount;
          state.totalShippingAmount -= itemShippingAmount;
          state.totalQuantity -= quantity;
          state.totalItemsCnt--;
          const index = state.cart.findIndex((item) => (item.product.id === id) );
          console.log("this is the index:", index);
          state.cart.splice(index, 1);
        }
        state.status = "idle";
      })
      .addCase(deleteCartItemAsync.rejected, (state) => {
        state.status = "idle";
      })
      //* delete Complete Cart ==================?
      .addCase(deleteCompleteUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCompleteUserCartAsync.fulfilled, (state, action) => {
        console.log("At the right Place", action.payload);
        const { success } = action.payload;
        if (success) {
          state.cart = [];
          state.status = "idle";
          state.totalAmount = 0;
          state.subTotal=0;
          state.totalTaxAmount = 0;
          state.totalShippingAmount = 0;
          state.totalItemsCnt = 0;
          state.totalQuantity = 0;
        }
        state.status = "idle";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
