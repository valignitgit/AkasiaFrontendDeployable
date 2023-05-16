import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Button from "../../../components/Button/CustomButton";
import Loader from "../../../components/Loader/Loader";
import { getCurrencyById } from "../../../redux/slices/currencySlice";

const ViewSecurity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state) => state.security?.data);
  const {
    // currency,
    currency_id,
    currency_name,
    currency_name_ar,
  } = currentCurrency;
  console.log("currentCurrency", currentCurrency);
  useEffect(() => {
    dispatch(getCurrencyById(id));
  }, []);

  const renderSecurityDetails = () => {
    if (
      // typeof currentCurrency === "object" &&
      currentCurrency !== null
      // !Array.isArray(currentCurrency)
    ) {
      return (
        <Grid container className={styles.currencyDetails__container}>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
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
                    <span className={`${styles.currencyDetails__itemValue} `}>
                      {currency_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className={styles.currencyDetails__buttonContainer}>
                <Link to={`/security/update/${currency_name}`}>
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.currencyDetails__button}
                  >
                    Update
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

  return <>{renderSecurityDetails()}</>;
};

export default ViewSecurity;
