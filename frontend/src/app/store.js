import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/productList/productListSlice'

export default configureStore({
    reducer:{
        product:productReducer,
    },
})