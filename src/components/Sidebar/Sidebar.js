import React from "react";
import { Box, Drawer } from "@mui/material";

import SidebarData from "./SidebarData";

import styles from "./styles.module.scss";

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerWidth = 290;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        className={styles.sidebar}
      >
        <SidebarData />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            marginTop: "70px",
          },
        }}
        open
        className={styles.sidebar}
      >
        <SidebarData />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
