import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "reactstrap";
import Header from "../components/Header";
import AccountPending from "../pages/AccountPending";
import { useDispatch, useSelector } from "react-redux";
import {
  userAuthStatus,
  userVerified,
  userAdmin,
  fetchUserDetails,
} from "../redux/authSlice";
import Pages from "../pages/index";
const Layout = () => {
  const dispatch = useDispatch();
  const userAuthLoading = useSelector(userAuthStatus);
  const isUserVerified = useSelector(userVerified);
  const isAdmin = useSelector(userAdmin);
  useEffect(() => {
    if (userAuthLoading === "idle") dispatch(fetchUserDetails());
  }, [userAuthLoading, dispatch]);
  if (userAuthLoading === "loading") {
    return <Spinner color="primary" type="grow" />;
  }
  if (userAuthLoading === "failed") {
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header isAdmin={isAdmin} />
      {!isUserVerified ? <AccountPending /> : <Pages isAdmin={isAdmin} />}
    </div>
  );
};

export default Layout;
