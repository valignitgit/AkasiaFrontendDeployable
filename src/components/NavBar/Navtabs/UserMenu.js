import React, { useState } from "react";

import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.scss";
// import { toggleMobileOpen } from "../../../redux/slices/layoutSlice";
// import { useDispatch } from "react-redux";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();

  // const handleDrawerToggle = () => {
  //   dispatch(toggleMobileOpen());
  // };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("login");
    navigate("/login");
  };

  return (
    <Box>
      <Avatar onClick={handleClick} className={styles.userAvatar}>
        A
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>Change Password</MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
