/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Button from "components/Button/CustomButton";

import { createBroker } from "redux/slices/brokerSlice";
import { getAllCurrencies } from "redux/slices/currencySlice";

import { getEmptyErrorState } from "utils/AppUtil";
import { getCurrencyList } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

const AddBroker = () => {
  const initialState = {
    broker_id: "",
    broker_name: "",
    broker_name_ar: "",
    currency_id: "",
    investment_account_id: "",
    bank_account_id: "",
    broker_abbr: "",
  };

  const currencyArray = useSelector((state) => state.currency.data);
  const currencyOptions = getCurrencyList(currencyArray || []);
  const [brokerData, setBrokerData] = useState(initialState);
  const [error, setErrors] = useState({
    broker_id: getEmptyErrorState(),
    broker_name: getEmptyErrorState(),
    broker_name_ar: getEmptyErrorState(),
    currency_id: getEmptyErrorState(),
    investment_account_id: getEmptyErrorState(),
    bank_account_id: getEmptyErrorState(),
    broker_abbr: getEmptyErrorState(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setBrokerData({ ...brokerData, [e.target.name]: e.target.value });
  };
  const {
    broker_id,
    broker_name,
    broker_name_ar,
    currency_id,
    investment_account_id,
    bank_account_id,
    broker_abbr,
  } = brokerData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      broker_id: getEmptyErrorState(),
      broker_name: getEmptyErrorState(),
      broker_name_ar: getEmptyErrorState(),
      currency_id: getEmptyErrorState(),
      investment_account_id: getEmptyErrorState(),
      bank_account_id: getEmptyErrorState(),
      broker_abbr: getEmptyErrorState(),
    };

    if (isEmptyString(broker_id)) {
      newErrors.broker_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Broker Id"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(broker_name)) {
      newErrors.broker_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Broker Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(broker_name_ar)) {
      newErrors.broker_name_ar = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Broker Name Arabic"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(currency_id)) {
      newErrors.currency_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Currency Id"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(investment_account_id)) {
      newErrors.investment_account_id = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Investment Account Id"
        ),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(bank_account_id)) {
      newErrors.bank_account_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Bank Account Id"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(broker_abbr)) {
      newErrors.broker_abbr = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Broker Abbreviation"
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
        const response = await dispatch(createBroker(brokerData)).unwrap();
        if (response.data) {
          navigate("/broker");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    dispatch(getAllCurrencies());
  }, []);

  const renderAddBrokerDetailsForm = () => {
    return (
      <>
        <Grid container className="form__gridCenter">
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className="form_styles">
              <Box className="form__headingWrapper">
                <Typography component="h1" variant="h5">
                  Add Broker
                </Typography>
              </Box>
              <Box
                component="form"
                className="form__container"
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="broker_id"
                  value={broker_id}
                  label="Broker id"
                  onChange={(e) => onChange(e)}
                />
                {error.broker_id.errorState && (
                  <span className="error">{error.broker_id.errorMessage}</span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="broker_name"
                  value={broker_name}
                  label="Broker Name"
                  onChange={(e) => onChange(e)}
                />
                {error.broker_name.errorState && (
                  <span className="error">
                    {error.broker_name.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="broker_name_ar"
                  value={broker_name_ar}
                  label="Broker Name Arabic"
                  onChange={(e) => onChange(e)}
                  className="textInput__rightAlighed"
                />
                {error.broker_name_ar.errorState && (
                  <span className="error">
                    {error.broker_name_ar.errorMessage}
                  </span>
                )}

                <FormControl
                  fullWidth
                  className="form__selectInput"
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
                  <span className="error">
                    {error.currency_id.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="investment_account_id"
                  value={investment_account_id}
                  label="Investment Account Id"
                  onChange={(e) => onChange(e)}
                />
                {error.investment_account_id.errorState && (
                  <span className="error">
                    {error.investment_account_id.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bank_account_id"
                  value={bank_account_id}
                  label="Bank Account Id"
                  onChange={(e) => onChange(e)}
                />
                {error.bank_account_id.errorState && (
                  <span className="error">
                    {error.bank_account_id.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="broker_abbr"
                  value={broker_abbr}
                  label="Broker Abbreviation"
                  onChange={(e) => onChange(e)}
                />
                {error.broker_abbr.errorState && (
                  <span className="error">
                    {error.broker_abbr.errorMessage}
                  </span>
                )}
                <div className="buttons_container">
                  <Button
                    variant="filled"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Link to="/broker">
                    <Button
                      variant="filled"
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

  return <>{renderAddBrokerDetailsForm()}</>;
};

export default AddBroker;
