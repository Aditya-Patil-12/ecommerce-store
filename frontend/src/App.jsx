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
  PageNotFound,
  OrderSuccessPage,
  HomePage,
  ProductsPage,
  ForgotPasswordPage
} from "./pages";
import Protected from "./features/auth/authComponents/Protected";
import { fetchUserItemsAsync } from "./features/cart/CartSlice";
import { loggedInUserInfoAsync } from "./features/user/UserSlice";

// auth will just verify password and user give back user ID
function App() {
  const userId = useSelector((state) => state.auth.userId);
  const isLogin = useSelector((state)=>state.auth.isLogin);
  const dispatch = useDispatch();
  console.log("in the app");
  useEffect(() => {
    console.log("ok over here");
    if( userId && isLogin ){
      const fetchOrdersAndInfo = async () => {
        console.log("here is the correct User Id",userId);
        await dispatch(loggedInUserInfoAsync(userId));
        await dispatch(fetchUserItemsAsync(userId));
      }
      fetchOrdersAndInfo();
    }
  }, [dispatch,userId]);
  console.log("Going to Routes")
  return (
    // rootUrl of the browser is fetched Over here .....
    <BrowserRouter>
      <Routes>
        {/* these are the login Sign Up Pages ...... */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/logout"
          element={
            <Protected>
              <LogoutPage />
            </Protected>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* ======================================== */}

        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        >
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
              <Protected>
                <OrderSuccessPage />
              </Protected>
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

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
