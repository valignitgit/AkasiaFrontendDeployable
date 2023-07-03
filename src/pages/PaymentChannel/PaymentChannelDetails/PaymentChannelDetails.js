import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import {
  getPaymentChannelById,
  setCurrentData,
} from "redux/slices/paymentChannelSlice";

import styles from "./style.module.scss";

const PaymentChannelDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPaymentChannel = useSelector(
    (state) => state.paymentChannel?.currentData
  );
  const { paymentChannelId, paymentChannelName, paymentChannelNameAr } =
    currentPaymentChannel || {};

  useEffect(() => {
    dispatch(getPaymentChannelById(id));
  }, []);

  const renderPaymentChannelDetails = () => {
    if (
      typeof currentPaymentChannel === "object" &&
      currentPaymentChannel !== null &&
      !Array.isArray(currentPaymentChannel)
    ) {
      return (
        <Grid container className="Details__container">
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className="Details__heading">
              Payment Channel Details
            </h1>

            <Card className="Details">
              <CardContent>
                <div className="Details__body">
                  <div>
                    <span className={`${styles.paymentChannelDetails__itemKey_width} Details__itemKey`}>
                      Payment Channel ID:
                    </span>
                    <span className={`${styles.paymentChannelDetails__itemValue_width} Details__itemValue`}>
                      {paymentChannelId || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.paymentChannelDetails__itemKey_width} Details__itemKey`}>
                      Payment Channel Name:
                    </span>
                    <span className={`${styles.paymentChannelDetails__itemValue_width} Details__itemValue`}>
                      {paymentChannelName || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.paymentChannelDetails__itemKey_width} Details__itemKey`}>
                      Payment Channel Name Arabic:
                    </span>
                    <span
                      className={`${styles.paymentChannelDetails__itemValue_width} Details__itemValue text_right`}
                    >
                      {paymentChannelNameAr || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions
                className="Details__buttonContainer"
              >
                <Link to="/payment-channel">
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

  return <>{renderPaymentChannelDetails()}</>;
};

export default PaymentChannelDetails;
