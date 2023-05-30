import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NavFoot = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/app" replace />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavFoot;
