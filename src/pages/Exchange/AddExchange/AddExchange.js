import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

import Button from "components/Button/CustomButton";

import { createExchange } from "redux/slices/exchangeSlice";

import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

import styles from "./style.module.scss";

const AddExchange = () => {
  const initialState = {
    exchange_id: "",
    exchange_name: "",
    exchange_name_ar: "",
  };

  const [exchangeData, setExchangeData] = useState(initialState);
  const [error, setErrors] = useState({
    exchange_id: getEmptyErrorState(),
    exchange_name: getEmptyErrorState(),
    exchange_name_ar: getEmptyErrorState(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setExchangeData({ ...exchangeData, [e.target.name]: e.target.value });
  };
  const { exchange_id, exchange_name, exchange_name_ar } = exchangeData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      exchange_id: getEmptyErrorState(),
      exchange_name: getEmptyErrorState(),
      exchange_name_ar: getEmptyErrorState(),
    };
    if (isEmptyString(exchange_id)) {
      newErrors.exchange_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Exchange Id"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(exchange_name)) {
      newErrors.exchange_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Exchange Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(exchange_name_ar)) {
      newErrors.exchange_name_ar = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Exchange Name Arabic"
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
      dispatch(createExchange(exchangeData));
      navigate("/exchange", { state: { newData: exchangeData } });
    }
  };

  const renderAddExchangeDetailsForm = () => {
    return (
      <>
        <Grid container className={styles.addExchange__gridCenter}>
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className={`${styles.addExchange__formWidth} form_styles`}>
              <Box className={styles.addExchange__formIcon_wrapper}>
                <Typography component="h1" variant="h5">
                  Add Exchange
                </Typography>
              </Box>
              <Box
                component="form"
                className={styles.addExchange__formContainer}
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Exchange Id"
                  name="exchange_id"
                  value={exchange_id}
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
                {error.exchange_id.errorState && (
                  <span className="error">
                    {error.exchange_id.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="exchange_name"
                  value={exchange_name}
                  label="Exchange Name"
                  onChange={(e) => onChange(e)}
                />
                {error.exchange_name.errorState && (
                  <span className="error">
                    {error.exchange_name.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="exchange_name_ar"
                  value={exchange_name_ar}
                  label="Exchange Name Arabic"
                  onChange={(e) => onChange(e)}
                />
                {error.exchange_name_ar.errorState && (
                  <span className="error">
                    {error.exchange_name_ar.errorMessage}
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

  return <>{renderAddExchangeDetailsForm()}</>;
};

export default AddExchange;
