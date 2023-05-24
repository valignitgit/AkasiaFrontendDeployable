/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Box, Menu, MenuItem, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.scss";
import { useDispatch } from "react-redux";
import { setData } from "../../../redux/slices/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChangePasswordDialogBox from "../ChangePassword/ChangePasswordDialog";
import { toggleMobileOpen } from "../../../redux/slices/layoutSlice";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDrawerToggle = () => {
    dispatch(toggleMobileOpen());
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    handleCloseMenu();
    handleDrawerToggle();
    navigate("/login");
    window.location.reload();
  };
  const renderUserMenu = () => {
    return (
      <Box>
        <Box>
          <Box onClick={handleClickMenu} className={styles.userName}>
            <AccountCircleIcon />
            <p>{user?.username}</p>
          </Box>
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={handleOpenDialog}>Change Password</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    );
  };

  const renderChangePasswordDialog = () => {
    return (
      <ChangePasswordDialogBox
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    );
  };

  return (
    <>
      {renderUserMenu()}
      {renderChangePasswordDialog()}
    </>
  );
}

export default UserMenu;
