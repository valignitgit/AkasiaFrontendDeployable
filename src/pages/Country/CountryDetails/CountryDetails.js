import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getCountryById, setCurrentData } from "redux/slices/countrySlice";

import styles from "./style.module.scss";

const CountryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentCountry = useSelector((state) => state.country?.currentData);
  const { country_id, country_name, country_name_ar } = currentCountry || {};
  useEffect(() => {
    dispatch(getCountryById(id));
  }, []);

  const renderCountryDetails = () => {
    if (
      typeof currentCountry === "object" &&
      currentCountry !== null &&
      !Array.isArray(currentCountry)
    ) {
      return (
        <Grid container className="Details__container">
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className="Details__heading">Country Details</h1>

            <Card className="Details">
              <CardContent>
                <div className="Details__body">
                  <div>
                    <span className={`${styles.countryDetails__itemKey_width} Details__itemKey`}>
                      Country ID:
                    </span>
                    <span className={`${styles.countryDetails__itemValue_width} Details__itemValue`}>
                      {country_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.countryDetails__itemKey_width} Details__itemKey`}>
                      Country Name:
                    </span>
                    <span className={`${styles.countryDetails__itemValue_width} Details__itemValue`}>
                      {country_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.countryDetails__itemKey_width} Details__itemKey`}>
                      Country Name (Arabic):
                    </span>
                    <span
                      className={`${styles.countryDetails__itemValue_width} Details__itemValue text_right`}
                    >
                      {country_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className="Details__buttonContainer">
                <Link to="/country">
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

  return <>{renderCountryDetails()}</>;
};

export default CountryDetails;
