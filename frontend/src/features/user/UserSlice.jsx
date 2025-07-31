import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders:[],
  userOrdersCount:0,
  userInfo:null, 
  // this will have more informatin to be used in case of detailed user info,
  // auth will only be used for loggedInUser id 
  status:"idle"
};

import {
  loggedInUserOrders,
  loggedInUserInfo,
  updateUserInfo,
  logOutUserInfo,
  deleteUserAddress
} from "./UserAPI";

export const loggedInUserInfoAsync = createAsyncThunk(
  "auth/loggedInUserInfoDetails",
  async (userId) => {
    console.log("userId",userId);
    return await loggedInUserInfo(userId);
  }
);

export const loggedInUserOrdersAsync = createAsyncThunk(
  "auth/loggedInUserOrdersDetails",
  async (userId) => {
    return await loggedInUserOrders(userId);
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "auth/updateUserInfoDetails",
  async (userInfo) => {
    console.log("check Info " , userInfo);
    return await updateUserInfo(userInfo);
  }
);
export const deleteUserAddressAsync = createAsyncThunk(
  "auth/deleteUserAddressDetails",
  async (addressId) => {
    console.log("check Info ", addressId);
    return await deleteUserAddress(addressId);
  }
);

export const logoOutUserInfoAsync = createAsyncThunk(
  "auth/logoOutUserInfoDetails",
  async () => {
    return await logOutUserInfo();
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserInfo:(state)=>{
      state.userInfo = null;
      state.userOrders= null;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      // Orders ==================>
      .addCase(loggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loggedInUserOrdersAsync.fulfilled, (state, action) => {
        const { success, orders, items } = action.payload;
        console.log("Here are your orders", action.payload);
        if (success) {
          state.userOrders = orders;
          state.userOrdersCount = items;
        }
        state.status = "idle";
      })
      // User Info ==============>
      .addCase(loggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loggedInUserInfoAsync.fulfilled, (state, action) => {
        const { success } = action.payload;
        console.log("here is the api response", action.payload);

        if (success) {
          state.userInfo = action.payload.user;
        }
        state.status = "idle";
      })
      // Update User Info ==========================>
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          console.log("data is ", data);
          state.userInfo = data;
        }
        state.status = "idle";
      })
      // Delete User Address  ==========================>
      .addCase(deleteUserAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          console.log("data is ", data);
          state.userInfo = data;
        }
        state.status = "idle";
      })
      // Logout User Info ==========================>
      .addCase(logoOutUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoOutUserInfoAsync.fulfilled, (state, action) => {
        const { success } = action.payload;
        if (success) {
          state.userInfo = null;
          state.userOrders = [];
        }
        state.status = "idle";
      });
      //=============================================
  },
});

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
