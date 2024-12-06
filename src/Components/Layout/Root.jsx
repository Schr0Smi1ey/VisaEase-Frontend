import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="my-32">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
