import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, adminOnly }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // login check
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // admin check
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;