import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSecurityById } from "../../../redux/slices/securitySlice";
import { Grid, Card, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../../components/Button/CustomButton";
import Loader from "../../../components/Loader/Loader";

const securityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentSecurity = useSelector((state) => state.security?.data);
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
  } = currentSecurity;

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
        <Grid container className={styles.securityDetails__container}>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
            <h1 className={styles.securityDetails__heading}>
              Security Details
            </h1>

            <Card className={styles.securityDetails}>
              <CardContent>
                <div className={styles.securityDetails__body}>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Security ID:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {security_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Security Name:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {security_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Security Name (Arabic):
                    </span>
                    <span
                      className={`${styles.securityDetails__itemValue} text_right`}
                    >
                      {security_name_ar || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Security Ref:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {security_ref || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Currency ID:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {currency_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Market Price Amount:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {market_price_amt || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Security Class:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {security_class || "NA"}
                    </span>
                  </div>

                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Security Type:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {security_type || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Is Tradable:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {is_tradable || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Is Marginable:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {is_marginable || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Is Fractionable:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {is_fractionable || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Exchange ID:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {exchange_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Is Islamic:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {is_islamic || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.securityDetails__itemKey}>
                      Is Shariah:
                    </span>
                    <span className={styles.securityDetails__itemValue}>
                      {is_shariah || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className={styles.securityDetails__buttonContainer}>
                <Link to="/security">
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.securityDetails__button}
                  >
                    Cancel
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
