import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const useAuth = () => {
  if (localStorage.getItem("login")) {
    return true;
  } else {
    return false;
  }
};

const PublicRoute = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/bank" /> : <Outlet />;
};

export default PublicRoute;
