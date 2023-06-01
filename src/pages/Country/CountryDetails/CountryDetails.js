import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Button from "../../../components/Button/CustomButton";
import Loader from "../../../components/Loader/Loader";
import { getCountryById } from "../../../redux/slices/countrySlice";

const CountryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentCountry = useSelector((state) => state.country?.data.data);
  const { country_id, country_name, country_name_ar } = currentCountry || {};
  useEffect(() => {
    dispatch(getCountryById(id));
  }, []);

  const renderCountryDetails = () => {
    if (!Array.isArray(currentCountry)) {
      return (
        <Grid container className={styles.countryDetails__container}>
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className={styles.countryDetails__heading}>Country Details</h1>

            <Card className={styles.countryDetails}>
              <CardContent>
                <div className={styles.countryDetails__body}>
                  <div>
                    <span className={styles.countryDetails__itemKey}>
                      Country ID:
                    </span>
                    <span className={styles.countryDetails__itemValue}>
                      {country_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.countryDetails__itemKey}>
                      Country Name:
                    </span>
                    <span className={styles.countryDetails__itemValue}>
                      {country_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.countryDetails__itemKey}>
                      Country Name (Arabic):
                    </span>
                    <span
                      className={`${styles.countryDetails__itemValue} text_right`}
                    >
                      {country_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className={styles.countryDetails__buttonContainer}>
                <Link to="/country">
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.countryDetails__button}
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

  return <>{renderCountryDetails()}</>;
};

export default CountryDetails;
