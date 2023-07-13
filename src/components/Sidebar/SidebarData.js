import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AccountBalance as AccountBalanceIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  // Groups as GroupsIcon,
  Language as LanguageIcon,
  Money as MoneyIcon,
  Payment as PaymentIcon,
  PeopleAlt as PeopleAltIcon,
  Security as SecurityIcon,
  SwitchAccount as SwitchAccountIcon,
  WorkOutline as WorkOutlineIcon,
} from "@mui/icons-material";
import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { toggleMobileOpen } from "redux/slices/layoutSlice";

import UserMenu from "../NavBar/Navtabs/UserMenu";

import styles from "./styles.module.scss";

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
    {
      label: "Payment Channel",
      icon: <PaymentIcon />,
      link: "/payment-channel",
    },
    {
      label: "Omnibus Account",
      icon: <SwitchAccountIcon />,
      link: "/omnibus-account",
    },
    // {
    //   label: "Customer",
    //   icon: <GroupsIcon />,
    //   link: "/customer",
    // },
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
