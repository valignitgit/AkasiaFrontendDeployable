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

import { getAllBanks } from "redux/slices/bankSlice";
import { getAllCurrencies } from "redux/slices/currencySlice";
import { createOmniBusAccount } from "redux/slices/omniBusAccountSlice";

import { getEmptyErrorState } from "utils/AppUtil";
import { getListByKey } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isCompanyCode, isEmptyString, isIbaNumber } from "utils/Validator";

const AddOmniBusAccount = () => {
  const initialState = {
    omnibusAccountId: "",
    bankAccountNum: "",
    bankAccountIban: "",
    bankAccountName: "",
    bankId: "",
    companyCode: "",
    accountSlNum: "",
    currencyId: "",
    bankBalanceAmt: "",
    bankAvailableNum: "",
  };

  const [omniBusAccountData, setOmniBusAccountData] = useState(initialState);
  const [error, setErrors] = useState({
    omnibusAccountId: getEmptyErrorState(),
    bankAccountNum: getEmptyErrorState(),
    bankAccountIban: getEmptyErrorState(),
    bankAccountName: getEmptyErrorState(),
    bankId: getEmptyErrorState(),
    companyCode: getEmptyErrorState(),
    currencyId: getEmptyErrorState(),
  });
  const currencyList = useSelector((state) => state.currency.data);
  const currencyOptions = getListByKey(currencyList, "currency_id");
  const BankList = useSelector((state) => state.bank.data);
  const BankOptions = getListByKey(BankList, "bank_id");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setOmniBusAccountData({
      ...omniBusAccountData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    omnibusAccountId,
    bankAccountNum,
    bankAccountIban,
    bankAccountName,
    bankId,
    companyCode,
    currencyId,
  } = omniBusAccountData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      omnibusAccountId: getEmptyErrorState(),
      bankAccountNum: getEmptyErrorState(),
      bankAccountIban: getEmptyErrorState(),
      bankAccountName: getEmptyErrorState(),
      bankId: getEmptyErrorState(),
      companyCode: getEmptyErrorState(),
      currencyId: getEmptyErrorState(),
    };

    if (isEmptyString(omnibusAccountId)) {
      newErrors.omnibusAccountId = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Omnibus Account ID"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(bankAccountNum)) {
      newErrors.bankAccountNum = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Bank Account Number"
        ),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(bankAccountIban)) {
      newErrors.bankAccountIban = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "International Bank Account Number"
        ),
        errorState: "error",
      };
      isValid = false;
    } else if (isIbaNumber(bankAccountIban)) {
      newErrors.bankAccountIban = {
        errorMessage: ErrorMessageGenerator.getIbaNumberMessage("IBN"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(bankAccountName)) {
      newErrors.bankAccountName = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Bank Account Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(bankId)) {
      newErrors.bankId = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage("Bank ID"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(companyCode)) {
      newErrors.companyCode = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Company Code"),
        errorState: "error",
      };
      isValid = false;
    } else if (isCompanyCode(companyCode)) {
      newErrors.companyCode = {
        errorMessage:
          ErrorMessageGenerator.getThreeDigitNumberMessage("Company Code"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(currencyId)) {
      newErrors.currencyId = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Account Currency ID"
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
        const response = await dispatch(
          createOmniBusAccount(omniBusAccountData)
        ).unwrap();
        if (response.data) {
          navigate("/omnibus-account");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllCurrencies());
    dispatch(getAllBanks());
  }, []);

  const renderAddOmniBusAccountForm = () => {
    return (
      <>
        <Grid container className="form__gridCenter">
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className="form_styles">
              <Box className="form__headingWrapper">
                <Typography component="h1" variant="h5">
                  Add Omnibus Account
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
                  name="omnibusAccountId"
                  value={omnibusAccountId}
                  label="Omnibus Account ID"
                  onChange={onChange}
                  className="form__textInput"
                />
                {error.omnibusAccountId.errorState && (
                  <span className="error">
                    {error.omnibusAccountId.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bankAccountNum"
                  value={bankAccountNum}
                  label="Bank Account Number"
                  onChange={onChange}
                  className="form__textInput"
                />
                {error.bankAccountNum.errorState && (
                  <span className="error">
                    {error.bankAccountNum.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bankAccountIban"
                  value={bankAccountIban}
                  label="International Bank Account Number"
                  onChange={onChange}
                  className="form__textInput"
                />
                {error.bankAccountIban.errorState && (
                  <span className="error">
                    {error.bankAccountIban.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bankAccountName"
                  value={bankAccountName}
                  label="Bank Account Name"
                  onChange={onChange}
                  className="form__textInput"
                />
                {error.bankAccountName.errorState && (
                  <span className="error">
                    {error.bankAccountName.errorMessage}
                  </span>
                )}

                <FormControl
                  fullWidth
                  className="form__selectInput"
                >
                  <InputLabel>Bank Id</InputLabel>
                  <Select
                    name="bankId"
                    value={bankId}
                    label="Bank Id"
                    onChange={(e) => onChange(e)}
                    autoComplete="off"
                  >
                    {BankOptions.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {error.bankId.errorState && (
                  <span className="error">{error.bankId.errorMessage}</span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="companyCode"
                  value={companyCode}
                  label="Company Code"
                  onChange={onChange}
                  className="form__textInput"
                />
                {error.companyCode.errorState && (
                  <span className="error">
                    {error.companyCode.errorMessage}
                  </span>
                )}

                <FormControl
                  fullWidth
                  className="form__selectInput"
                >
                  <InputLabel>Currency Id</InputLabel>
                  <Select
                    name="currencyId"
                    value={currencyId}
                    label="Currency Id"
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

                {error.currencyId.errorState && (
                  <span className="error">{error.currencyId.errorMessage}</span>
                )}

                <div className="buttons_container">
                  <Button variant="filled" type="submit">
                    Submit
                  </Button>
                  <Link to="/omnibus-account">
                    <Button variant="filled">Cancel</Button>
                  </Link>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  return <>{renderAddOmniBusAccountForm()}</>;
};

export default AddOmniBusAccount;
