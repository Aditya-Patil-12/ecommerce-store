import { configureStore , combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productList/productListSlice";
import authReducer from '../features/auth/AuthSlice'
import cartReducer from '../features/cart/CartSlice'
import orderReducer from '../features/order/OrderSlice'
import userReducer from '../features/user/UserSlice'
import reviewReducer from '../features/review/ReviewSlice'
import { persistReducer ,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
  review: reviewReducer,
});
const persistConfig = {
  key : "root",
  storage,
  version:1,
}
//  our store will be saved to the local storage, and even after a browser refresh, our data will remain.
const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const persistor = persistStore(store);