import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Button from "components/Button/CustomButton";

import { getAllCurrencies } from "redux/slices/currencySlice";
import { createSecurity } from "redux/slices/securitySlice";

import { getCurrencyList } from "utils/AppUtil";
import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { getSecurityTypeList } from "utils/SecurityUtil";
import { isEmptyString } from "utils/Validator";

import styles from "./style.module.scss";

const AddSecurity = () => {
  const securityTypeOptions = getSecurityTypeList();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currencyArray = useSelector((state) => state.currency.data);
  const currencyOptions = getCurrencyList(currencyArray);
  const initialState = {
    security_id: "",
    security_name: "",
    security_name_ar: "",
    security_ref: "",
    security_class: "",
    security_type: "",
    market_price_amt: "",
    is_tradable: "",
    is_marginable: "",
    is_fractionable: "",
    exchange_id: "",
    is_islamic: "no",
    is_shariah: "no",
    currency_id: "",
  };
  const [security, setSecurity] = useState(initialState);
  const [error, setError] = useState({
    security_id: getEmptyErrorState(),
    security_name: getEmptyErrorState(),
    security_name_ar: getEmptyErrorState(),
    security_class: getEmptyErrorState(),
    security_type: getEmptyErrorState(),
    currency_id: getEmptyErrorState(),
  });
  const onChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.checked ? "yes" : "no";
    setSecurity({ ...security, [fieldName]: fieldValue });
  };

  const {
    security_id,
    security_name,
    security_name_ar,
    security_class,
    security_type,
    is_islamic,
    is_shariah,
    currency_id,
  } = security;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      security_id: getEmptyErrorState(),
      security_name: getEmptyErrorState(),
      security_name_ar: getEmptyErrorState(),
      security_class: getEmptyErrorState(),
      security_type: getEmptyErrorState(),
      currency_id: getEmptyErrorState(),
    };
    if (isEmptyString(security_id)) {
      newErrors.security_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Security Id"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(security_name)) {
      newErrors.security_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Security Name"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(security_name_ar)) {
      newErrors.security_name_ar = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Security Name Arabic"
        ),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(security_class)) {
      newErrors.security_class = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Security Class"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(security_type)) {
      newErrors.security_type = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Security Type"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(currency_id)) {
      newErrors.currency_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Currency"),
        errorState: "error",
      };
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      await dispatch(createSecurity(security))
        .then(() => {
          navigate("/security", { state: { newData: security } });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    dispatch(getAllCurrencies());
  }, []);

  return (
    <>
      <Grid container className={styles.addsecurity__gridCenter}>
        <Grid item xs={12} sm={10} md={7} lg={6} xl={4}>
          <Paper className="form_styles">
            <Box className={styles.addsecurity__formIcon_wrapper}>
              <Typography component="h1" variant="h5">
                Add Security
              </Typography>
            </Box>
            <Box
              component="form"
              className={styles.addsecurity__formContainer}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                fullWidth
                name="security_id"
                value={security_id}
                label="Security Id"
                onChange={(e) => onChange(e)}
                autoComplete="off"
                className={styles.addsecurity__textInput}
              />
              {error.security_id.errorState && (
                <span className="error">{error.security_id.errorMessage}</span>
              )}

              <TextField
                margin="normal"
                fullWidth
                name="security_name"
                value={security_name}
                label="Security Name"
                onChange={(e) => onChange(e)}
                autoComplete="off"
                className={styles.addsecurity__textInput}
              />
              {error.security_name.errorState && (
                <span className="error">
                  {error.security_name.errorMessage}
                </span>
              )}

              <TextField
                margin="normal"
                fullWidth
                name="security_name_ar"
                value={security_name_ar}
                label="Security Name Arabic"
                onChange={(e) => onChange(e)}
                autoComplete="off"
                className={styles.addsecurity__textInput}
              />
              {error.security_name_ar.errorState && (
                <span className="error">
                  {error.security_name_ar.errorMessage}
                </span>
              )}

              <FormControl
                fullWidth
                className={styles.addsecurity__selectInput}
              >
                <InputLabel>Security Class</InputLabel>
                <Select
                  name="security_class"
                  value={security_class}
                  label="Security Class"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                >
                  <MenuItem value="us_equity">US Equity</MenuItem>
                </Select>
              </FormControl>
              {error.security_class.errorState && (
                <span className="error">
                  {error.security_class.errorMessage}
                </span>
              )}

              <FormControl
                fullWidth
                className={styles.addsecurity__selectInput}
              >
                <InputLabel>Security Type</InputLabel>
                <Select
                  name="security_type"
                  value={security_type}
                  label="Security Type"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                >
                  {securityTypeOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {error.security_type.errorState && (
                <span className="error">
                  {error.security_type.errorMessage}
                </span>
              )}

              <FormControl
                fullWidth
                className={styles.addsecurity__selectInput}
              >
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency_id"
                  value={currency_id}
                  label="Currency"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                >
                  {currencyOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {error.currency_id.errorState && (
                <span className="error">{error.currency_id.errorMessage}</span>
              )}

              <Box className="default_margin">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckboxChange}
                      name="is_islamic"
                      checked={is_islamic === "yes"}
                    />
                  }
                  label="Is Islamic"
                  labelPlacement="start"
                  className={styles.addsecurity__checkBoxInput}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckboxChange}
                      name="is_shariah"
                      checked={is_shariah === "yes"}
                    />
                  }
                  label="Is Sharia"
                  labelPlacement="start"
                  className={styles.addsecurity__checkBoxInput}
                />
              </Box>
              <div className="buttons_container">
                <Button
                  variant="filled"
                  type="submit"
                  className={styles.addsecurity__submitBtn}
                >
                  Submit
                </Button>
                <Link to="/security">
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

export default AddSecurity;
