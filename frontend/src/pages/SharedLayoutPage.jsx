import React from "react";
import { Outlet } from "react-router";
import Navbar from "../features/navbar/Navbar";
import { ToastContainer } from "react-toastify";
const SharedLayoutPage = () => {
  return (
    <>
      <Navbar>
        <ToastContainer />
        <Outlet></Outlet>
      </Navbar>
    </>
  );
};

export default SharedLayoutPage;
