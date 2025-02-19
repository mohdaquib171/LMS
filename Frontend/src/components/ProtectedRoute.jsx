import React from "react";
import { Navigate } from "react-router-dom";
import {
  checkTokenValidity,
  clearAdminToken,
  clearUserToken,
  getAdminToken,
  getUserToken,
  isUserSessionValid,
} from "../utils/token";

const ProtectedRoute = ({ children, role }) => {
  if (role === "admin") {
    if (!getAdminToken() || !checkTokenValidity()) {
      clearAdminToken();
      return <Navigate to="/admin/login" />;
    }
  } else if (role === "user") {
    if (!getUserToken() || !isUserSessionValid()) {
      clearUserToken();
      return <Navigate to="/" state={{ openLogin: true }} />;
    }
  }

  return children;
};

export default ProtectedRoute;