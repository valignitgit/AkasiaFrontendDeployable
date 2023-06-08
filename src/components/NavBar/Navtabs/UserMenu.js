import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Menu, MenuItem } from "@mui/material";

import { toggleMobileOpen } from "redux/slices/layoutSlice";

import ChangePasswordDialogBox from "../ChangePassword/ChangePasswordDialog";

import styles from "../style.module.scss";

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
    dispatch(toggleMobileOpen());
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
    //  localStorage.removeItem("userCredentials");

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
