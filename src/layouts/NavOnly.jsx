import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Other from "../components/Other";

const NavOnly = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="layout_container">
        <Sidebar />
        <div className="main_container">
          <Outlet />
        </div>
        <Other />
      </div>
    </>
  );
};

export default NavOnly;
