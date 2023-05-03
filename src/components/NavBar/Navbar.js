import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoTransparent.png";
import styles from "./style.module.scss";

const Navbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={styles.navbar}>
          <Link to="/bank">
            <Box className={styles.logoContainer}>
              <img src={logo} alt={logo} className={styles.logo} />
            </Box>
          </Link>
          <Hidden mdDown>
            <Stack direction="row" spacing={2}>
              {/* <Link to="/bank">
                <Button color="inherit">Home</Button>
              </Link>
              <Options /> */}
              <Button
                color="inherit"
                onClick={handleLogout}
                className={styles.logoutBtn}
              >
                Logout
              </Button>
            </Stack>
          </Hidden>

          <Hidden mdUp>
            <IconButton>
              <MenuIcon sx={{ color: "white" }} onClick={handleDrawerToggle} />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
