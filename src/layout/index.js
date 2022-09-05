import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "reactstrap";
import axios from "axios";
import Header from "../components/Header";
const Layout = () => {
  const [authStatus, setAuthStatus] = useState("idle");

  useEffect(() => {
    setAuthStatus("loading");
    const accessToken = sessionStorage.getItem("accessToken");
    const verifyToken = async () => {
      const response = await axios.post(
        "verify-token",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return { ...response.data };
    };
    verifyToken()
      .then((res) => {
        if (res.user) {
          setAuthStatus("succeeded");
        }
      })
      .catch((err) => {
        sessionStorage.clear();
        setAuthStatus("failed");
      });
  }, []);
  if (authStatus === "loading") {
    return <Spinner color="primary" type="grow" />;
  }
  if (authStatus === "failed") return <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
