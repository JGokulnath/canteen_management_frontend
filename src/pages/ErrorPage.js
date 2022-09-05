import React from "react";
import { Navigate } from "react-router-dom";
const ErrorPage = () => {
  const auth = sessionStorage.getItem("accessToken");
  return auth ? <Navigate to="/" /> : <Navigate to="/login" />;
};

export default ErrorPage;
