import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
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

const fetchProductDetailAsync = createAsyncThunk(
  "product/fetchProductDetail",
  async (id) => {
    // console.log("Inside fetch Product Details\n");
    return await singleProductAPI(id);
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
    return await productsFiltersListAPI();
  }
);

const addProductAsync = createAsyncThunk(
  "product/addProductDetails",
  async (product)=>{
    return  await addProductAPI(product);
})

const editProductAsync = createAsyncThunk(
  "product/editProductDetails",
  async (product) => {
    return await editProductAPI(product);
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
      // ====================
      // Fetch Particular Product ......
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.currentProduct = null;
        state.status = "loading";
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        // console.log("Action Fufilled payload", action);
        state.status = "idle";
        const {success} = action.payload;
        if( success ){
          state.currentProduct = action.payload.product;
        }
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
        console.log("am i here " , action.payload.data);
        state.products = action.payload.products;
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
        console.log("Action Fufilled payload", action.payload);
        state.status = "idle";
        state.filters = action.payload.filters;
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
        // remember to fetch the product list again bro 
        // state.products.push(action.payload.data);
        console.log(action.payload, "data is added");
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        const {success} = action.payload;
        if( success ){
          const data = action.payload.product.product;
          const index = state.products.findIndex( (product) => product.id === data.id );
          console.log(data, " ", index);
          if (index != -1)  {
            state.products[index] = data;
          }
        }
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
  fetchProductDetailAsync,
  fetchProductByFiltersAsync,
  fetchProductsFiltersAsync,
  addProductAsync,
  editProductAsync,
};

export default productSlice.reducer;


// learnings is that redux gives data sent from backend res.json(***{}***)
// in like action.payload{ data: ***{   }***}