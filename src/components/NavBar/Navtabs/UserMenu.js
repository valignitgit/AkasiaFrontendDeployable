import React, { useState } from "react";

import { Box, Menu, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.scss";
// import { toggleMobileOpen } from "../../../redux/slices/layoutSlice";
import { useSelector } from "react-redux";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();

  // const handleDrawerToggle = () => {
  //   dispatch(toggleMobileOpen());
  // };
  const user = useSelector((state) => state.auth.data.result.username);
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
    window.location.reload();
  };

  return (
    <Box>
      <Button onClick={handleClick} className={styles.userName}>
        {user}
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
