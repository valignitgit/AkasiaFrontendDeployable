import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

import Button from "components/Button/CustomButton";

import { createCountry } from "redux/slices/countrySlice";

import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

import styles from "./style.module.scss";

const AddCountry = () => {
  const initialState = {
    country_id: "",
    country_name: "",
    country_name_ar: "",
  };

  const [countryData, setCountryData] = useState(initialState);
  const [error, setErrors] = useState({
    country_id: getEmptyErrorState(),
    country_name: getEmptyErrorState(),
    country_name_ar: getEmptyErrorState(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCountryData({ ...countryData, [e.target.name]: e.target.value });
  };
  const { country_id, country_name, country_name_ar } = countryData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      country_id: getEmptyErrorState(),
      country_name: getEmptyErrorState(),
      country_name_ar: getEmptyErrorState(),
    };
    if (isEmptyString(country_id)) {
      newErrors.country_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Country Id"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(country_name)) {
      newErrors.country_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Country Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(country_name_ar)) {
      newErrors.country_name_ar = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Country Name Arabic"
        ),
        errorState: "error",
      };
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await dispatch(createCountry(countryData)).unwrap();
        if (response.data);
        {
          navigate("/country");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderAddCountryDetailsForm = () => {
    return (
      <>
        <Grid container className={styles.addCountry__gridCenter}>
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className={`${styles.addCountry__formWidth} form_styles`}>
              <Box className={styles.addCountry__formIcon_wrapper}>
                <Typography component="h1" variant="h5">
                  Add Country
                </Typography>
              </Box>
              <Box
                component="form"
                className={styles.addCountry__formContainer}
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Country Id"
                  name="country_id"
                  value={country_id}
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
                {error.country_id.errorState && (
                  <span className="error">{error.country_id.errorMessage}</span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="country_name"
                  value={country_name}
                  label="Country Name"
                  onChange={(e) => onChange(e)}
                />
                {error.country_name.errorState && (
                  <span className="error">
                    {error.country_name.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="country_name_ar"
                  value={country_name_ar}
                  label="Country Name Arabic"
                  onChange={(e) => onChange(e)}
                />
                {error.country_name_ar.errorState && (
                  <span className="error">
                    {error.country_name_ar.errorMessage}
                  </span>
                )}
                <div className="buttons_container">
                  <Button
                    variant="filled"
                    type="submit"
                    className={styles.addBtn}
                  >
                    Submit
                  </Button>
                  <Link to="/exchange">
                    <Button
                      variant="filled"
                      type="submit"
                      className={styles.addBtn}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  return <>{renderAddCountryDetailsForm()}</>;
};

export default AddCountry;
