import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productListAPI } from "./productListAPI";
import { productListLimit } from "../../app/constants";
const initialState = {
  products: [],
  category:[],
  brand:[],
  totalItems: 0,
  page: 1,
  status: "idle",
};

const fetchProductListAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await productListAPI();
    return response.data;
  }
);

const fetchProductDetailAsync = createAsyncThunk(
  "product/fetchProductDetail",
  async (id) => {
    // console.log("Inside fetch Product Details\n");
    const response = await fetch(
      `http://localhost:5000/api/v1/product/product-detail/${id}`
    );
    return await response.json();
  }
);

const fetchProductCategoryAsync = createAsyncThunk(
  "product/fetchCategoryDetail",
  async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/product/filters/category`
    );
    const data = await response.json();
    return {
      data:data,
    };
  }
);
const fetchProductBrandAsync = createAsyncThunk(
  "product/fetchBrandDetail",
  async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/product/filters/brand`
    );
    const data = await response.json();
    return {
      data:data,
    };
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    incrementPage: (state) => {
      console.log("over hhere");
      state.page = Math.min(
        state.page + 1,
        Math.ceil(state.totalItems / productListLimit)
      );
    },
    decrementPage: (state) => {
      state.page = Math.max(state.page - 1, 1);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  _extraReducers: (builder) => {
    builder
      .addCase(fetchProductListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Action Fufilled payload");
        state.products = action.payload.data;
        state.totalItems = state.products.length;
        state.page = 1;
      })
      .addCase(fetchProductListAsync.rejected, (state) => {
        state.status = "failed";
        state.totalItems = 0;
        state.page = 1;
        state.products = [];
      })
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        console.log("Action Fufilled payload", action);
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = state.products ? state.products.length : 0;
        state.page = 1;
        console.log(state.products);
      })
      .addCase(fetchProductDetailAsync.rejected, (state) => {
        state.status = "failed";
        state.totalItems = 0;
        state.page = 1;
        state.products = [];
      })
      .addCase(fetchProductBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("brand is full filled here",action.payload.data);
        
        state.brand = action.payload.data.result;
        state.page = 1;
      })
      .addCase(fetchProductBrandAsync.rejected, (state) => {
        state.status = "failed";
        state.page = 1;
        state.brand = [];
      })
      .addCase(fetchProductCategoryAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProductCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("category", action.payload);
        
        state.category = action.payload.data.result;
        state.page = 1;
      })
      .addCase(fetchProductCategoryAsync.rejected, (state) => {
        state.status = "failed";
        state.page = 1;
        state.category = [];
      });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
});

export const { incrementPage, decrementPage, setPage } = productSlice.actions;
export {
  fetchProductListAsync,
  fetchProductDetailAsync,
  fetchProductCategoryAsync,
  fetchProductBrandAsync,
};

export default productSlice.reducer;


// learnings is that redux gives data sent from backend res.json(***{}***)
// in like action.payload{ data: ***{   }***}