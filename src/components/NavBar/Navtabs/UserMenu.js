/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Box, Menu, MenuItem, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.scss";
import { useDispatch } from "react-redux";
import { setData } from "../../../redux/slices/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");

    dispatch(setData([]));
    navigate("/login");
  };

  return (
    <Box>
      <Box>
        <Box onClick={handleClick} className={styles.userName}>
          {/* <Avatar className={styles.userAvatar}>
            {user?.username.charAt(0)}
          </Avatar> */}
          <AccountCircleIcon />
          <p>{user?.username}</p>
        </Box>
      </Box>
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
