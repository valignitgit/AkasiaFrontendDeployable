import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/NavBar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { toggleMobileOpen } from "../redux/slices/layoutSlice";

const Layout = () => {
  const mobileOpen = useSelector((state) => state.layout.mobileOpen);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggleMobileOpen());
  };

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{
          padding: {
            xs: "15px",
            sm: "15px",
            md: "12px 16px 30px 260px",
          },
          marginTop: "70px",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
