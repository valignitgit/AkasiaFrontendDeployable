import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const useAuth = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

const RequireAuth = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
