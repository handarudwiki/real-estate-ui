// import React from 'react
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./layout.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export function RequireAuth() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}
