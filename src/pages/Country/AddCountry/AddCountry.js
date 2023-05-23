/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCountry,
  resetCountryState,
} from "../../../redux/slices/countrySlice";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import Button from "../../../components/Button/CustomButton";
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
    // else if (isArabic(country_name_ar)) {
    //   newErrors.country_name_ar = {
    //     errorMessage:
    //       ErrorMessageGenerator.getStringInArabicMessage("Country Name"),
    //     errorState: "error",
    //   };
    //   isValid = false;
    // }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const res = await dispatch(createCountry(countryData)).unwrap();

        if (res.status === 201 || res.status === 200);
        {
          console.log("res", res);

          dispatch(resetCountryState());
          navigate("/country", { state: { newData: countryData } });
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

                <Button
                  variant="filled"
                  type="submit"
                  className={styles.addBtn}
                  fullWidth
                >
                  Submit
                </Button>
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
