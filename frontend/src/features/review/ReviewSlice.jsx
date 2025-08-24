import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createReviewAPI,
    getReviewAPI,
    getProductReviewAPI,
    deleteReviewAPI,
    editReviewAPI,
} from "./ReviewAPI";

const initialState = {
  reviews: [],
  totalReviews: null,
  currentReview: null,
  reviewPage: 1,
  status: "idle",
};

export const createReviewAsync = createAsyncThunk(
  "review/createReviewDetails",
  async (reviewDetails) => {
    return await createReviewAPI(reviewDetails);
  }
);
export const getReviewAsync = createAsyncThunk(
  "review/getReviewDetails",
  async () => {
    return await getReviewAPI();
  }
);
export const getProductReviewAsync = createAsyncThunk(
  "review/getProductReviewDetails",
  async (product) => {
    console.log("Product");
    
    return await getProductReviewAPI(product);
  }
);
export const deleteReviewAsync = createAsyncThunk(
  "review/deleteReviewDetails",
  async (review) => {
    console.log("Product");
    const resp = await deleteReviewAPI(review);
    if( !resp.success ) return {success:false};
    return { reviewId: review, success: true };
  }
);
export const editReviewAsync = createAsyncThunk(
  "review/editReviewDetails",
  async (updatedItems) => {
    return await editReviewAPI(updatedItems);
  }
);
export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setCurrrentReview : (state,action)=>{
      const id = action.payload;
      state.currentReview = state.reviews.filter((review) => review._id == id)[0];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReviewAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        console.log(action.payload, "   ", action.payload.data);
        if (success) {
          console.log(data);
        }
        // order problem is solved ......
        state.status = "idle";
      })
      .addCase(createReviewAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReviewAsync.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        console.log(action.payload, "   ", action.payload.data);
        if (success) {
          state.reviews = data;
          state.totalReviews = action.totalReviews;
        }
        // order problem is solved ......
        state.status = "idle";
      })
      .addCase(getReviewAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getProductReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductReviewAsync.fulfilled, (state, action) => {
        const { success, data, totalReviews } = action.payload;
        console.log(action.payload);
        if (success) {
          state.reviews = data;
          state.totalReviews = totalReviews;
        }
        // // order problem is solved ......
        // state.status = "idle";
      })
      .addCase(getProductReviewAsync.rejected, (state) => {
        console.log("In rejected format");

        state.status = "rejected";
      })
      .addCase(deleteReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        let reviewId = action.payload.reviewId;
        state.reviews = state.reviews.filter((review) => {
          return review._id != reviewId;
        });
        state.totalReviews = state.totalReviews - 1;
        // // order problem is solved ......
        state.status = "idle";
      })
      .addCase(deleteReviewAsync.rejected, (state) => {
        console.log("In rejected format");

        state.status = "rejected";
      })
      .addCase(editReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editReviewAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        let {data} = action.payload;
        console.log(data);

        let index = state.reviews.findIndex((review)=> (review._id == data._id) );
        if( index != -1 ){
          state.reviews[index] = data;
        }
        else{
          console.log("Hey logged the wrong id ")
        }
        state.status = "idle";
      })
      .addCase(editReviewAsync.rejected, (state) => {
        console.log("In rejected format");

        state.status = "rejected";
      });
  },
});

// put the methods insides reducers******
export const { setCurrrentReview } = reviewSlice.actions;

// this is reducer .......
export default reviewSlice.reducer;
