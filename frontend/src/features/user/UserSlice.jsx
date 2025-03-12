import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders:[],
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
} from "./UserAPI";

export const loggedInUserInfoAsync = createAsyncThunk(
  "auth/loggedInUserInfoDetails",
  async (userId) => {
    console.log("userId",userId);
    const resp = await loggedInUserInfo(userId);
    return resp;
  }
);

export const loggedInUserOrdersAsync = createAsyncThunk(
  "auth/loggedInUserOrdersDetails",
  async (userId) => {
    const resp = await loggedInUserOrders(userId);
    return resp;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "auth/updateUserInfoDetails",
  async (userInfo) => {
    console.log("check Info " , userInfo);
    const resp = await updateUserInfo(userInfo);
    return resp;
  }
);

export const logoOutUserInfoAsync = createAsyncThunk(
  "auth/logoOutUserInfoDetails",
  async (userId) => {
    console.log("check Info ", userId);
    const resp = await logOutUserInfo(userId);
    return resp;
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
      .addCase(loggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loggedInUserOrdersAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          console.log("data is ", data);
          state.userOrders = data;
        }
        state.status = "idle";
      })
      .addCase(loggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loggedInUserInfoAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          console.log("data is ", data);
          state.userInfo = data;
        }
        state.status = "idle";
      })
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
      .addCase(logoOutUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoOutUserInfoAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          console.log("data is ", data);
          state.userInfo = null;
          state.userOrders = [];
        }
        state.status = "idle";
      });
  },
});

export const { clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
