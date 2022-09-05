import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const auth = sessionStorage.getItem("accessToken");
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
