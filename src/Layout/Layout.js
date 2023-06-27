import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "components/NavBar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";

import { toggleMobileOpen } from "redux/slices/layoutSlice";

const Layout = () => {
  const mobileOpen = useSelector((state) => state.layout.mobileOpen);
  const dispatch = useDispatch();
  const location = useLocation();
  const containerRef = useRef(null);

  const handleDrawerToggle = () => {
    dispatch(toggleMobileOpen());
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [location]);

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{
          marginTop: "70px",
          overflow: "auto",
          maxHeight: "calc(100vh - 70px)",
        }}
        ref={containerRef}
      >
        <Box
          sx={{
            padding: {
              xs: "15px",
              sm: "15px",
              md: "12px 16px 30px 305px",
            },
            // overflow: "auto",
            // maxHeight: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
