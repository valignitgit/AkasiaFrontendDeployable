import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoTransparent.png";
import styles from "./style.module.scss";
import UserMenu from "./Navtabs/UserMenu";

const Navbar = ({ handleDrawerToggle }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={styles.navbar}>
          <Box className={styles.navbar__leftmenu}>
            <Link to="/bank">
              <Box className={styles.logoContainer}>
                <img src={logo} alt={logo} className={styles.logo} />
              </Box>
            </Link>

            <h2>Akasia Investment Back Office</h2>
          </Box>
          <Hidden mdDown>
            <Stack direction="row" spacing={2}>
              <UserMenu className={styles.UserMenu} />
            </Stack>
          </Hidden>

          <Hidden mdUp>
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon className={styles.humburgeMenu} />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
