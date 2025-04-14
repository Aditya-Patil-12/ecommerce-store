import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: null,
  userEmail:null,
  isLogin:false,
  status: "idle",
};

import {
  createUser,
  checkUser,
} from "./AuthAPI";

const createUserAsync = createAsyncThunk(
  "auth/createUserDetails",
  async (info) => {
    console.log("fetchUserDetailAsync :", info);
    return await createUser(info);
  }
);

const checkUserAsync = createAsyncThunk(
  "auth/checkUserDetail",
  async (info) => {
    console.log("checkUserAsync :", info);
    return  await checkUser(info);
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  // exported as slice.actions .....
  reducers: {
    clearAuthUser: (state) => {
      state.userId = null;
      state.userEmail = null;
      state.isLogin=false;
      state.userAddresses = [];
    },
    setIsLogin:(state,action)=>{
      state.isLogin =action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        const { success } = action.payload;
        // if (success){
        //   // state.isLogin
        // } 
        state.status = "idle";
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = "rejected";
        // state.userEmail = null;
        // state.userId = null;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        const { success } = action.payload;
        if (success) {
          state.userEmail = action.payload.user.email;
          state.userId = action.payload.user.id;
        }
        state.status = "idle";
      })
      .addCase(checkUserAsync.rejected, (state) => {
        state.status = "rejected";
        // we willl check for use 
        // state.userEmail = null;
        // state.userId = null;
      });
  },
});

export const { clearAuthUser, setIsLogin } = authSlice.actions;

export {
  createUserAsync,
  checkUserAsync,

};
export default authSlice.reducer;
