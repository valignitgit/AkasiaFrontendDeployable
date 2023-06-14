import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

import Button from "components/Button/CustomButton";

import { createCurrency } from "redux/slices/currencySlice";

import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

import styles from "./style.module.scss";

const AddCurrency = () => {
  const initialState = {
    currency: "",
    currency_id: "",
    currency_name: "",
    currency_name_ar: "",
  };

  const [currencyData, setCurrencyData] = useState(initialState);
  const [error, setErrors] = useState({
    currency: getEmptyErrorState(),
    currency_id: getEmptyErrorState(),
    currency_name: getEmptyErrorState(),
    currency_name_ar: getEmptyErrorState(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCurrencyData({ ...currencyData, [e.target.name]: e.target.value });
  };
  const { currency_id, currency_name, currency_name_ar } = currencyData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currency: getEmptyErrorState(),
      currency_id: getEmptyErrorState(),
      currency_name: getEmptyErrorState(),
      currency_name_ar: getEmptyErrorState(),
    };
    if (isEmptyString(currency_id)) {
      newErrors.currency_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Currency Id"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(currency_name)) {
      newErrors.currency_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Currency Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(currency_name_ar)) {
      newErrors.currency_name_ar = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Currency Name Arabic"
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
        const response = await dispatch(createCurrency(currencyData)).unwrap();
        console.log(response);
        if (response.data) {
          navigate("/currency");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderAddCurrencyDetailsForm = () => {
    return (
      <>
        <Grid container className={styles.addCurrency__gridCenter}>
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className={`${styles.addCurrency__formWidth} form_styles`}>
              <Box className={styles.addCurrency__formIcon_wrapper}>
                <Typography component="h1" variant="h5">
                  Add Currency
                </Typography>
              </Box>
              <Box
                component="form"
                className={styles.addCurrency__formContainer}
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="currency_id"
                  value={currency_id}
                  label="Currency Id"
                  onChange={(e) => onChange(e)}
                />
                {error.currency_id.errorState && (
                  <span className="error">
                    {error.currency_id.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="currency_name"
                  value={currency_name}
                  label="Currency Name"
                  onChange={(e) => onChange(e)}
                />
                {error.currency_name.errorState && (
                  <span className="error">
                    {error.currency_name.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="currency_name_ar"
                  value={currency_name_ar}
                  label="Currency Name Arabic"
                  onChange={(e) => onChange(e)}
                />
                {error.currency_name_ar.errorState && (
                  <span className="error">
                    {error.currency_name_ar.errorMessage}
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
                  <Link to="/currency">
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

  return <>{renderAddCurrencyDetailsForm()}</>;
};

export default AddCurrency;
