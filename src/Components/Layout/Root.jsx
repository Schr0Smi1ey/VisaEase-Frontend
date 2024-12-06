import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Shared/Footer/Footer";
import { ScaleLoader } from "react-spinners";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const Root = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader color="#FF6363" size={150} />
      </div>
    );
  }
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
