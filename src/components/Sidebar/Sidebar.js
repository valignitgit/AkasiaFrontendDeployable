import React from "react";

import { Box, Drawer } from "@mui/material";

import SidebarData from "./SidebarData";

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerWidth = 250;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
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
            marginTop: "65px",
          },
        }}
        open
      >
        <SidebarData />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
