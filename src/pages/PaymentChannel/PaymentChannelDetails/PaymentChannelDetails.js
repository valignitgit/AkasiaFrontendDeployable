import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getCurrencyById, setCurrentData } from "redux/slices/currencySlice";

import styles from "./style.module.scss";

const CurrencyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state) => state.currency?.currentData);
  const { currency_id, currency_name, currency_name_ar } =
    currentCurrency || {};

  useEffect(() => {
    dispatch(getCurrencyById(id));
  }, []);

  const renderCurrencyDetails = () => {
    if (
      typeof currentCurrency === "object" &&
      currentCurrency !== null &&
      !Array.isArray(currentCurrency)
    ) {
      return (
        <Grid container className={styles.currencyDetails__container}>
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className={styles.currencyDetails__heading}>
              Currency Details
            </h1>

            <Card className={styles.currencyDetails}>
              <CardContent>
                <div className={styles.currencyDetails__body}>
                  <div>
                    <span className={styles.currencyDetails__itemKey}>
                      Currency ID:
                    </span>
                    <span className={styles.currencyDetails__itemValue}>
                      {currency_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.currencyDetails__itemKey}>
                      Currency Name:
                    </span>
                    <span className={styles.currencyDetails__itemValue}>
                      {currency_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.currencyDetails__itemKey}>
                      Currency Name (Arabic):
                    </span>
                    <span
                      className={`${styles.currencyDetails__itemValue} text_right`}
                    >
                      {currency_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className={styles.currencyDetails__buttonContainer}>
                <Link to="/currency">
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.currencyDetails__button}
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

  return <>{renderCurrencyDetails()}</>;
};

export default CurrencyDetails;
