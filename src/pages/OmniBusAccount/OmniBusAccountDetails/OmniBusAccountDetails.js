import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import {
  getOmniBusAccountById,
  setCurrentData,
} from "redux/slices/omniBusAccountSlice";

import styles from "./style.module.scss";

const OmniBusAccountDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentOmniBusAccount = useSelector(
    (state) => state.omniBusAccount?.currentData
  );

  const {
    omnibusAccountId,
    bankAccountNum,
    bankAccountIban,
    bankAccountName,
    bankId,
    companyCode,
    accountSlNum,
    currencyId,
    bankBalanceAmt,
    bankAvailableNum,
  } = currentOmniBusAccount || {};

  useEffect(() => {
    dispatch(getOmniBusAccountById(id));
  }, []);

  const renderOmniBusAccountDetails = () => {
    if (
      typeof currentOmniBusAccount === "object" &&
      currentOmniBusAccount !== null &&
      !Array.isArray(currentOmniBusAccount)
    ) {
      return (
        <Grid container className={styles.omniBusAccountDetails__container}>
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className={styles.omniBusAccountDetails__heading}>
              Omnibus Account Details
            </h1>

            <Card className={styles.omniBusAccountDetails}>
              <CardContent>
                <div className={styles.omniBusAccountDetails__body}>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Omnibus Account ID:
                    </span>
                    <span className={styles.omniBusAccountDetails__itemValue}>
                      {omnibusAccountId || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Bank Account Number:
                    </span>
                    <span className={styles.omniBusAccountDetails__itemValue}>
                      {bankAccountNum || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Bank Account IBAN:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {bankAccountIban || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Bank Account Name:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {bankAccountName || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Bank ID:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {bankId || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Company Code:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {companyCode || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Account Serial Number:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {accountSlNum || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Account Currency ID:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {currencyId || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Bank Balance Amount:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {bankBalanceAmt || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.omniBusAccountDetails__itemKey}>
                      Bank Available Number:
                    </span>
                    <span
                      className={`${styles.omniBusAccountDetails__itemValue} `}
                    >
                      {bankAvailableNum || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions
                className={styles.omniBusAccountDetails__buttonContainer}
              >
                <Link to="/omnibus-account">
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.omniBusAccountDetails__button}
                    onClick={() => dispatch(setCurrentData())}
                  >
                    Back
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  };

  return <>{renderOmniBusAccountDetails()}</>;
};

export default OmniBusAccountDetails;
