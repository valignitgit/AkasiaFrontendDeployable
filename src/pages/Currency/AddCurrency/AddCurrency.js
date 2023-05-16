/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import Button from "../../../components/Button/CustomButton";
import styles from "./style.module.scss";
import { createCurrency } from "../../../redux/slices/currencySlice";

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
  const { currency, currency_id, currency_name, currency_name_ar } =
    currencyData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currency: getEmptyErrorState(),
      currency_id: getEmptyErrorState(),
      currency_name: getEmptyErrorState(),
      currency_name_ar: getEmptyErrorState(),
    };
    // if (isEmptyString(currency)) {
    //   newErrors.currency = {
    //     errorMessage:
    //       ErrorMessageGenerator.getMandatoryFieldMessage("Currency"),
    //     errorState: "error",
    //   };
    //   isValid = false;
    // }
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
    } else if (isArabic(currency_name_ar)) {
      newErrors.currency_name_ar = {
        errorMessage:
          ErrorMessageGenerator.getStringInArabicMessage("Currency Name"),
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
      dispatch(createCurrency(currencyData));
      // navigate("/currency", { state: { newData: currencyData } });
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
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Currency"
                  name="currency"
                  value={currency}
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
                {error.currency.errorState && (
                  <span className="error">{error.currency.errorMessage}</span>
                )} */}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="currency_id"
                  value={currency_id}
                  label="Current Id"
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
                  label="Current Name"
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

  return <>{renderAddCurrencyDetailsForm()}</>;
};

export default AddCurrency;
