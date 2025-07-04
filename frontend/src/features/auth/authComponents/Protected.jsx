import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const Protected = ({ children }) => {
  const user = useSelector((state) => state.user.userInfo);
  // console.log("name is ", user);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  // Admin should never go to Customer Section ========>
  if( user && (user.role) === "admin" ){
    {
      return <Navigate to="/admin" replace={true}></Navigate>;
    }
  }
  return children;
};
export default Protected;
