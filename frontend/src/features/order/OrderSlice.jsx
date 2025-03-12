import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createOrder } from "./OrderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder:null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrderDetails",
  async (orderDetails) => {
    console.log(orderDetails);
    delete orderDetails['id'];
    console.log(orderDetails);
    const resp = await createOrder(orderDetails);
    return resp;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder : (state,action)=>{
      state.currentOrder = action.payload;
    },
    clearOrders : (state)=>{
      state.orders= [];
      state.currentOrder=null;
      state.status= "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const { success,data } = action.payload;
        if( success ){
          state.orders.push(data);
          state.currentOrder = data.id;
        } 
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// put the methods insides reducers******
export const { resetCurrentOrder ,clearOrders } = orderSlice.actions;
// this is reducer .......
export default orderSlice.reducer;
