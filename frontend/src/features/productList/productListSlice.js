import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  productListAPI,
  singleProductAPI,
  productsByFiltersAPI,
  productsFiltersListAPI,
  addProductAPI,
  editProductAPI,
} from "./productListAPI";
import { productListLimit } from "../../app/constants";

const initialState = {
  products: [],
  filters:[],
  currentProduct:null,
  totalItems: 0,
  page: 1,
  filterQuery:{},
  sortQuery:{},
  status: "idle",
};

const fetchProductListAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    // console.log("entered here");
    // console.log("page: ",page);
    
    const response = await productListAPI();
    // console.log("*adfsas*asddfadsf*asfd***sending back",response);
    return {
      data:response
    };
  }
);

const fetchProductDetailAsync = createAsyncThunk(
  "product/fetchProductDetail",
  async (id) => {
    // console.log("Inside fetch Product Details\n");
    const response = await singleProductAPI(id);
    return {
      data:response
    };
  }
);

const fetchProductByFiltersAsync = createAsyncThunk(
  "product/fetchProductByFiltersDetail",
  async ({filterQuery, sortQuery,page}) => {
    // console.log("This is need for it :", filterQuery);
    // console.log("Inside fetch Product Details\n");
    const response = await productsByFiltersAPI({ filterQuery, sortQuery, page });
    // console.log("asdfasdf ;::::::::",response );
    
    return response;
  }
);

const fetchProductsFiltersAsync = createAsyncThunk(
  "product/fetchProductsFiltersDetail",
  async () => {
    // console.log("This is need for it :", filters);
    // console.log("Inside fetch Product Details\n");
    const response = await productsFiltersListAPI();
    return {
      data: response,
    };
  }
);

const addProductAsync = createAsyncThunk(
  "product/addProductDetails",
  async (product)=>{
    const resp = await addProductAPI(product);
    if (resp.success) {
      return { data: resp.data, success: true };
    }
    return { success: false };
})

const editProductAsync = createAsyncThunk(
  "product/editProductDetails",
  async (product) => {
    const resp = await editProductAPI(product);
    console.log(resp);
    
    if (resp.success) {
      return { data: resp.data, success: true };
    }
    else return { success: false };
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    incrementPage: (state) => {
      // console.log("over hhere");
      state.page = Math.min(
        state.page + 1,
        Math.ceil(state.totalItems / productListLimit)
      );
      // console.log("change in state: ",state.page);
    },
    decrementPage: (state) => {
      state.page = Math.max(state.page - 1, 1);
    },
    setPage: (state, action) => {
      // console.log("setting the page" ,action.payload);
      
      state.page = action.payload;
    },
    clearProducts: (state)=>{
      state.products= [];
      state.filters=[];
      state.currentProduct=null;
      state.totalItems= 0;
      state.page= 1;
      state.status= "idle";
    },
    clearSelectedProduct: (state)=>{
      state.currentProduct = null;
    },
    setFilterQuery:(state,action)=>{
      state.filterQuery=action.payload;
    },
    setSortQuery :(state,action)=>{
      state.sortQuery = action.payload;
    }
  },
  // underscore is important ....
  _extraReducers: (builder) => {
    builder
      // get Complete Prdocuts List //////////
      .addCase(fetchProductListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Over here", action.payload);
        state.products = action.payload.data;
        state.totalItems = action.payload.data.length;
        state.page = 1;
      })
      .addCase(fetchProductListAsync.rejected, (state) => {
        state.status = "failed";
        state.totalItems = 0;
        state.page = 1;
        state.products = [];
      })
      // ====================

      // Fetch Particular Product ......
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.currentProduct = null;
        state.status = "loading";
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        // console.log("Action Fufilled payload", action);
        state.status = "idle";
        state.currentProduct = action.payload.data[0];
      })
      .addCase(fetchProductDetailAsync.rejected, (state) => {
        state.status = "failed";
        state.currentProduct = null;
        state.products = [];
      })
      // =========================
      // fetch Products by Filters .....
      .addCase(fetchProductByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFiltersAsync.fulfilled, (state, action) => {
        // console.log("Action Fufilled payload", action);
        state.status = "idle";
        // console.log("am i here " , action.payload.data);
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByFiltersAsync.rejected, (state) => {
        state.status = "failed";
        state.products = [];
      })
      // Complete Filters For Every Product ==============================
      .addCase(fetchProductsFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsFiltersAsync.fulfilled, (state, action) => {
        // console.log("Action Fufilled payload", action);
        state.status = "idle";
        state.filters = action.payload.data;
      })
      .addCase(fetchProductsFiltersAsync.rejected, (state) => {
        state.status = "failed";
        state.filters = [];
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        // console.log("Action Fufilled payload", action);
        state.status = "idle";
        state.products.push(action.payload.data);
        console.log(action.payload, "data is added");
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        const data = action.payload.data;
        const filterdData = state.products.filter( (product) => product.id !== data.id );
        console.log(data, " ", filterdData);
        // if( findIndex ){
          state.products = [...filterdData,data];
        // }
        state.status = "idle";
      })
      .addCase(editProductAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
});

export const { incrementPage, decrementPage, setPage ,clearProducts ,clearSelectedProduct ,setFilterQuery,setSortQuery } = productSlice.actions;
export {
  fetchProductListAsync,
  fetchProductDetailAsync,
  fetchProductByFiltersAsync,
  fetchProductsFiltersAsync,
  addProductAsync,
  editProductAsync,
};

export default productSlice.reducer;


// learnings is that redux gives data sent from backend res.json(***{}***)
// in like action.payload{ data: ***{   }***}