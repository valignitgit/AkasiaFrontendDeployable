import { Button } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";

const CustomButton = ({ children }) => {
  return (
    <Button className={styles.btn} type="button">
      {children}
    </Button>
  );
};

export default CustomButton;
