"use client";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  LoginPage,
  SignUpPage,
  LogoutPage,
  CartPage,
  CheckOutPage,
  ProductDetailPage,
  UserOrdersPage,
  UserProfilePage,
  OrderTrackingPage,
  PageNotFound,
  OrderSuccessPage,
  SharedLayoutPage,
  HomePage,
  ProductsPage,
  ForgotPasswordPage,
  AdminHomePage,
  AdminProductDetailPage,
  AdminOrdersPage,
  AdminProductPage,
  AdminProductFormPage
} from "./pages";
import Demo from "./pages/Demo";
import Protected from "./features/auth/authComponents/Protected";
import ProtectedAdmin from "./features/auth/authComponents/ProtectedAdmin";
import { fetchUserItemsAsync } from "./features/cart/CartSlice";
import { loggedInUserOrdersAsync } from "./features/user/UserSlice";
import { loggedInUserInfoAsync } from "./features/user/UserSlice";
import { fetchAllCurrentUserOrdersAsync } from "./features/order/OrderSlice";
// auth will just verify password and user give back user ID

function App() {
  const userId = useSelector((state) => state.auth.userId);
  console.log(userId);
  const dispatch = useDispatch();
  console.log("in the app");
  useEffect(() => {
    console.log("ok over here");
    if( userId ){
      const fetchOrdersAndInfo = async () => {
        console.log("here is the correct User Id",userId);
        await dispatch(loggedInUserInfoAsync(userId));
        await dispatch(loggedInUserOrdersAsync());
        await dispatch(fetchUserItemsAsync());
        await dispatch(fetchAllCurrentUserOrdersAsync());
      }
      fetchOrdersAndInfo();
    }
  }, [dispatch,userId]);
  console.log("Going to Routes")
  return (
    // rootUrl of the browser is fetched Over here .....
    <>
      {/* <ToastContainer/> */}
      <BrowserRouter>
        <Routes>
          {/* these are the login Sign Up Pages ...... */}
          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUpPage />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              // <Protected>
              <>
                <LogoutPage />
              </>
              // </Protected>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* ======================================== */}
          {/* TODO : Provide the Home Page (Landing Page access to Any User) */}
          <Route
            path="/"
            element={
              <Protected>
                <SharedLayoutPage />
              </Protected>
            }
          >
            <Route
              index
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
            <Route
              path="/products"
              element={
                <Protected>
                  <ProductsPage />
                </Protected>
              }
            />

            <Route
              path="/cart"
              element={
                <Protected>
                  <CartPage />
                </Protected>
              }
            />

            <Route
              path="/checkout"
              element={
                <Protected>
                  <CheckOutPage />
                </Protected>
              }
            />

            <Route
              path="/product-detail/:id"
              element={
                <Protected>
                  <ProductDetailPage />
                </Protected>
              }
            />

            <Route
              path="/order-success/:id"
              element={
                // <Protected>
                  <OrderSuccessPage />
                // {/* </Protected> */}
              }
            />

            <Route
              path="/profile"
              element={
                <Protected>
                  <UserProfilePage />
                </Protected>
              }
            />

            <Route
              path="/orders"
              element={
                <Protected>
                  <UserOrdersPage />
                </Protected>
              }
            />

            <Route
              path="/singleOrder/:id"
              element={
                <Protected>
                  <OrderTrackingPage />
                </Protected>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Admin Routes ===============================*/}
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <SharedLayoutPage />
              </ProtectedAdmin>
            }
          >
            <Route
              index
              element={
                <ProtectedAdmin>
                  <AdminHomePage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedAdmin>
                  <AdminProductPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="product-detail/:id"
              element={
                <ProtectedAdmin>
                  <AdminProductDetailPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedAdmin>
                  <AdminOrdersPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="productForm"
              element={
                <ProtectedAdmin>
                  <AdminProductFormPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="productForm/edit/:id"
              element={
                <ProtectedAdmin>
                  <AdminProductFormPage />
                </ProtectedAdmin>
              }
            />
          </Route>
          {/* ========================== */}
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
