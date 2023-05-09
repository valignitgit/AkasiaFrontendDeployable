import React, { useState } from "react";

import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.scss";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
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
