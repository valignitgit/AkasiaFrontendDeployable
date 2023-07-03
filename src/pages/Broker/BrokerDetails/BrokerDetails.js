/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getBrokerById, setCurrentData } from "redux/slices/brokerSlice";

import styles from "./style.module.scss";

const BrokerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBroker = useSelector((state) => state.broker?.currentData);
  const {
    broker_id,
    broker_name,
    broker_name_ar,
    currency_id,
    investment_account_id,
    bank_account_id,
    broker_abbr,
  } = currentBroker || {};

  useEffect(() => {
    dispatch(getBrokerById(id));
  }, []);

  const renderBrokerDetails = () => {
    if (
      typeof currentBroker === "object" &&
      currentBroker !== null &&
      !Array.isArray(currentBroker)
    ) {
      return (
        <Grid container className="Details__container">
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className="Details__heading">Broker Details</h1>

            <Card className="Details">
              <CardContent>
                <div className="Details__body">
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Broker ID:
                    </span>
                    <span className={`${styles.brokerDetails__itemValue_width} Details__itemValue`}>
                      {broker_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Broker Name:
                    </span>
                    <span className={`${styles.brokerDetails__itemValue_width} Details__itemValue`}>
                      {broker_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Broker Name (Arabic):
                    </span>
                    <span
                      className={`${styles.brokerDetails__itemValue_width} Details__itemValue text_right`}
                    >
                      {broker_name_ar || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Currency ID:
                    </span>
                    <span className={`${styles.brokerDetails__itemValue_width} Details__itemValue`}>
                      {currency_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Investment Account ID:
                    </span>
                    <span className={`${styles.brokerDetails__itemValue_width} Details__itemValue`}>
                      {investment_account_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Bank Account ID:
                    </span>
                    <span className={`${styles.brokerDetails__itemValue_width} Details__itemValue`}>
                      {bank_account_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.brokerDetails__itemKey_width} Details__itemKey`}>
                      Broker Abbreviation:
                    </span>
                    <span className={`${styles.brokerDetails__itemValue_width} Details__itemValue`}>
                      {broker_abbr || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className="Details__buttonContainer">
                <Link to="/broker">
                  <Button
                    variant="filled"
                    shape="square"
                    className="Details__button"
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

  return <>{renderBrokerDetails()}</>;
};

export default BrokerDetails;
