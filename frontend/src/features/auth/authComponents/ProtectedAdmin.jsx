import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
const ProtectedAdmin = ({ children }) => {
  // const userName = useSelector((state) => state.auth.userName);
  const user = useSelector((state) => state.user.userInfo);
  // console.log("name is ", userName);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if( (user) && (user.role !== "admin") ){
    return <Navigate to="/" replace={true}/>;
  }
  return children;
};
export default ProtectedAdmin;
