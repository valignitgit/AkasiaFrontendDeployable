/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Box, Menu, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../../redux/slices/authSlice";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.auth.data.result?.username);
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
      <Button onClick={handleClick} className={styles.userName}>
        {user?.username}
      </Button>
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
