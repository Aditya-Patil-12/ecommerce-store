import React from "react";
import { Outlet } from "react-router";
import Navbar from "../features/navbar/Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar>
        <Outlet></Outlet>
      </Navbar>
    </>
  );
};

export default HomePage;
