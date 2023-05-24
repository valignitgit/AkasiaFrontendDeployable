import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SecurityIcon from "@mui/icons-material/Security";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MoneyIcon from "@mui/icons-material/Money";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Hidden,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import UserMenu from "../NavBar/Navtabs/UserMenu";
import { toggleMobileOpen } from "../../redux/slices/layoutSlice";
import { useDispatch } from "react-redux";

function SidebarData() {
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggleMobileOpen());
  };

  const ListItemData = [
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
    {
      label: "Security",
      icon: <SecurityIcon />,
      link: "/security",
    },
    {
      label: "Currency",
      icon: <MoneyIcon />,
      link: "/currency",
    },
    {
      label: "Exchange",
      icon: <CurrencyExchangeIcon />,
      link: "/exchange",
    },
    {
      label: "Country",
      icon: <LanguageIcon />,
      link: "/country",
    },
    {
      label: "Broker",
      icon: <PeopleAltIcon />,
      link: "/broker",
    },
  ];

  return (
    <List>
      <Hidden mdUp>
        <Link to="/bank">
          <Box className={styles.logoContainer}>
            <UserMenu />
          </Box>
        </Link>
      </Hidden>
      {ListItemData.map((item) => (
        <ListItem
          component={NavLink}
          to={item.link}
          exact
          key={item.link}
          onClick={handleDrawerToggle}
          className={styles.listItem}
          activeClassName={styles.listItemActive}
        >
          <ListItemIcon className={styles.listItemIcon}>
            {item.icon}
          </ListItemIcon>
          <ListItemText className={styles.listItemText}>
            {item.label}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default SidebarData;
