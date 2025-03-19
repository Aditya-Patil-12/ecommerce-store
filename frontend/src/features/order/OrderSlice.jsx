import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderAPI , fetchAllOrdersAPI, updateOrderAPI } from "./OrderAPI";

const initialState = {
  orders: [],
  totalOrders:null,
  currentOrder:null,
  ordersPage:1,
  orderSortQuery:{},
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrderDetails",
  async (orderDetails) => {
    console.log(orderDetails);
    delete orderDetails['id'];
    console.log(orderDetails);
    const resp = await createOrderAPI(orderDetails);
    return resp;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrdersDetails",
  async (info) => {
    const resp = await fetchAllOrdersAPI(info);
    return resp;
  }
);
export const updateOrderDetailsAsync = createAsyncThunk(
  "order/updateOrderDetials",
  async (newOrder)=>{
    const resp  = await updateOrderAPI(newOrder);
    // console.log(resp);
    return newOrder;
})
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    incrementOrdersPage: (state, action) => {
      console.log(action.payload);

      state.ordersPage = Math.min(action.payload, state.ordersPage + 1);
    },
    decrementOrdersPage: (state, action) => {
      state.ordersPage = Math.max(1, state.ordersPage - 1);
    },
    setOrdersPage: (state, action) => {
      state.ordersPage = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.status = "idle";
    },
    setOrderSortQuery: (state, action) => {
      const obj = action.payload;
      console.log({ ...state.orderSortQuery, ...obj });
      state.orderSortQuery = { ...state.orderSortQuery, ...obj };
    },
    deleteOrderSortQuery:(state,action)=>{
      console.log(action.payload);
      
      delete state.orderSortQuery[action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const { success, data } = action.payload;
        if (success) {
          state.orders.push(data);
          state.currentOrder = data.id;
        }
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const { data, totalOrders } = action.payload;
        console.log(data, "At it right place");
        state.orders = data;
        state.totalOrders = totalOrders;
        state.page = 1;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateOrderDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderDetailsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const newOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order.id === newOrder.id
        );
        state.orders[index] = newOrder;
      })
      .addCase(updateOrderDetailsAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// put the methods insides reducers******
export const {
  resetCurrentOrder,
  clearOrders,
  incrementOrdersPage,
  decrementOrdersPage,
  ordersPage,
  setOrdersPage,
  setOrderSortQuery,
  deleteOrderSortQuery,
} = orderSlice.actions;
// this is reducer .......
export default orderSlice.reducer;
