import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getExchangeById, setCurrentData } from "redux/slices/exchangeSlice";

import styles from "./style.module.scss";

const ExchangeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentExchange = useSelector((state) => state.exchange?.currentData);
  const { exchange_id, exchange_name, exchange_name_ar } =
    currentExchange || {};

  useEffect(() => {
    dispatch(getExchangeById(id));
  }, []);

  const renderExchangeDetails = () => {
    if (
      typeof currentExchange === "object" &&
      currentExchange !== null &&
      !Array.isArray(currentExchange)
    ) {
      return (
        <Grid container className={styles.exchangeDetails__container}>
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className={styles.exchangeDetails__heading}>
              Exchange Details
            </h1>

            <Card className={styles.exchangeDetails}>
              <CardContent>
                <div className={styles.exchangeDetails__body}>
                  <div>
                    <span className={styles.exchangeDetails__itemKey}>
                      Exchange ID:
                    </span>
                    <span className={styles.exchangeDetails__itemValue}>
                      {exchange_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.exchangeDetails__itemKey}>
                      Exchange Name:
                    </span>
                    <span className={styles.exchangeDetails__itemValue}>
                      {exchange_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.exchangeDetails__itemKey}>
                      Exchange Name (Arabic):
                    </span>
                    <span
                      className={`${styles.exchangeDetails__itemValue} text_right`}
                    >
                      {exchange_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className={styles.exchangeDetails__buttonContainer}>
                <Link to="/exchange">
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.exchangeDetails__button}
                    onClick={() => dispatch(setCurrentData())}
                  >
                    Ok
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

  return <>{renderExchangeDetails()}</>;
};

export default ExchangeDetails;
