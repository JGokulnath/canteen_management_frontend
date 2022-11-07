import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "reactstrap";
import axios from "axios";
import Header from "../components/Header";
import AccountPending from "../pages/AccountPending";
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
          if (res.verified) setAuthStatus("succeeded");
          else setAuthStatus("pending");
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
      {authStatus === "pending" ? <AccountPending /> : <Outlet />}
    </div>
  );
};

export default Layout;
