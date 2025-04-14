import React from "react";

import { Navigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../cart/CartSlice";
import { clearOrders } from "../../order/OrderSlice";
import { clearProducts } from "../../productList/productListSlice";
import { logoOutUserInfoAsync } from "../../user/UserSlice"; 
import { clearAuthUser } from "../AuthSlice";
// expiry the token ....
import {clearUserInfo} from '../../user/UserSlice'
const Logout = () => {
  const dispatch = useDispatch();
  // all features should be set to NULL ....
  // orders , cart ,products
  // lastly auth and user

  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearOrders());
    dispatch(clearProducts());
    dispatch(clearAuthUser());
    dispatch(logoOutUserInfoAsync());
    dispatch(clearUserInfo());
  }, [dispatch]);
  console.log(user);
  
  // React Fragment is necessary : as useEffect can be delayed ...
  return (
    <>
      {!user && <Navigate to="/login" replace />}
      <h1>Logging Out {user?.userName}</h1>
    </>
  );
};

export default Logout;