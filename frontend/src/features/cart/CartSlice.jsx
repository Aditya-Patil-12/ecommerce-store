import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCartItem,
  getCartItemsByUserId,
  deleteCartItem,
  deleteCompleteUserCart,
} from "./CartAPI";

const initialState = {
  cart: [],
  amount: 0,
  totalItems: 0,
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
    console.log(itemDetails);
    return await addToCart(itemDetails);
  }
);


export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemDetails",
  async (updateItem) => {
    console.log("check",updateItem);
    const {product ,_id,...restInfo } = updateItem.item;
    const resp = await updateCartItem({
      ...restInfo,
      quantity: updateItem.newQuantity,
      product: product.id,
    });
    console.log(
      updateItem.newQuantity,
      " ",
      updateItem.item.quantity,
      "  ",
      updateItem.item.price
    );
    const change = {
      updatedCost: ((+updateItem.newQuantity) -( +updateItem.item.quantity)) *(+updateItem.item.product.price),
      updatedItems: (+updateItem.newQuantity) - (+updateItem.item.quantity),
      updatedQuantity: (updateItem.newQuantity),
      id: updateItem.item.product.id,
    };
    return {...resp,...change};
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
    return { ...item , ...resp };
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
        const { success } = action.payload;
        if (success) {
          const item = action.payload.product;
          state.cart.push(item);
          state.amount = state.amount + +item.quantity * +item.product.price;
          state.totalItems += +item.quantity;
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
          let items = action.payload.userCart.cart;
          state.cart = items;
          state.amount = items.reduce((prev, item) => {
            return prev + +item.quantity * +item.product.price;
          }, 0);
          state.totalItems = items.reduce(
            (prev, item) => prev + +item.quantity,
            0
          );
        }
        state.status = "idle";
      })
      // =====================================>

      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        console.log(state.cart);
        const { success } = action.payload;
        if (success) {
          const { id, updatedItems, updatedCost, updatedQuantity } =
            action.payload;
          state.amount += updatedCost;
          state.totalItems += updatedItems;

          const index = state.cart.findIndex((item) => {
            return item.product.id === id;
          });
          state.cart[index].quantity = updatedQuantity;
        }
      })
      // * delte Cart Item ===================>
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        console.log("delete payload: ", action.payload);
        const { updateByAmount, updateByItem, id, success } = action.payload;
        if (success) {
          state.amount += updateByAmount;
          state.totalItems += updateByItem;

          const index = state.cart.findIndex((item) => item.product.id === id);
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
          state.amount = 0;
          state.totalItems = 0;
        }
        state.status = "idle";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
