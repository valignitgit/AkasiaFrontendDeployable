import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Options from "./Navtabs/Options";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/login");
  };

  return (
    <>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Panel
            </Typography>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Hidden mdDown>
              <Stack direction="row" spacing={2}>
                <Link to="/bank">
                  <Button color="inherit">Home</Button>
                </Link>
                <Options />
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
            </Hidden>

            <Hidden mdUp>
              <IconButton>
                <MenuIcon
                  sx={{ color: "white" }}
                  onClick={handleDrawerToggle}
                />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
