import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getSecurityById, setCurrentData } from "redux/slices/securitySlice";

import styles from "./styles.module.scss";

const securityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentSecurity = useSelector((state) => state.security?.currentData);
  const {
    security_id,
    security_name,
    security_name_ar,
    security_ref,
    security_class,
    security_type,
    currency_id,
    market_price_amt,
    is_tradable,
    is_marginable,
    is_fractionable,
    exchange_id,
    is_islamic,
    is_shariah,
  } = currentSecurity || {};

  useEffect(() => {
    dispatch(getSecurityById(id));
  }, []);

  const rendersecurityDetails = () => {
    if (
      typeof currentSecurity === "object" &&
      currentSecurity !== null &&
      !Array.isArray(currentSecurity)
    ) {
      return (
        <Grid container className="Details__container">
          <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
            <h1 className="Details__heading">
              Security Details
            </h1>

            <Card className="Details">
              <CardContent>
                <div className="Details__body">
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Security ID:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {security_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Security Name:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {security_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Security Name (Arabic):
                    </span>
                    <span
                      className={`${styles.securityDetails__itemValue_width} Details__itemValue text_right`}
                    >
                      {security_name_ar || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Security Ref:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {security_ref || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Currency ID:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {currency_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Market Price Amount:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {market_price_amt || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Security Class:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {security_class || "NA"}
                    </span>
                  </div>

                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Security Type:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {security_type || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Is Tradable:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {is_tradable || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Is Marginable:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {is_marginable || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Is Fractionable:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {is_fractionable || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Exchange ID:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {exchange_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Is Islamic:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {is_islamic || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.securityDetails__itemKey_width} Details__itemKey`}>
                      Is Shariah:
                    </span>
                    <span className={`${styles.securityDetails__itemValue_width} Details__itemValue`}>
                      {is_shariah || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className="Details__buttonContainer">
                <Link to="/security">
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

  return <>{rendersecurityDetails()}</>;
};

export default securityDetails;
