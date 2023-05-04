/* eslint-disable no-undef */
import React from "react";
import { Button } from "@mui/material";
import styles from "./style.module.scss";

const FillButton = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { className, bsStyle, disabled, children } = props;

  return <Button className={`${styles.btn} className`}>{children}</Button>;
};

export default FillButton;
