import React from "react";
import ProductList from "../features/productList/productComponent/ProductList";
import Navbar from "../features/navbar/Navbar";
import LoginPage from "./LoginPage";
import SignUp from "../features/auth/authComponents/SignUp";
const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      {/* <LoginPage />
      <SignUp /> */}
    </div>
  );
};

export default Home;
