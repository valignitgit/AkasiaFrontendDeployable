import React from "react";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
// import SettingsIcon from "@mui/icons-material/Settings";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

function SidebarData() {
  const ListItemData = [
    // {
    //   label: "Dashboard",
    //   icon: <DashboardIcon />,
    //   link: "/",
    // },
    {
      label: "Bank",
      icon: <AccountBalanceIcon />,
      link: "/bank",
    },

    {
      label: "Portfolio",
      icon: <WorkOutlineIcon />,
      link: "/portfolio",
    },
    // {
    //   label: "Broker",
    //   icon: <PersonIcon />,
    //   link: "broker",
    // },
    {
      label: "Security",
      icon: <SecurityIcon />,
      link: "/security",
    },
    // {
    //   label: "Setting",
    //   icon: <SettingsIcon />,
    //   link: "/setting",
    // },
  ];
  return (
    <List>
      {ListItemData.map((item) => (
        <ListItem
          component={NavLink}
          to={item.link}
          exact
          key={item.link}
          activeClassName="active"
          className={styles.sidebar__menu}
        >
          <ListItemIcon className={styles.sidebar__menu_icon}>
            {item.icon}
          </ListItemIcon>
          <ListItemText className={styles.sidebar__menu_text}>
            {item.label}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default SidebarData;
