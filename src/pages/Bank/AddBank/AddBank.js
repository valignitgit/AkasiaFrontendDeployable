import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBank } from "../../../redux/slices/bankSlice";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import Button from "../../../components/Button/CustomButton";
import styles from "./style.module.scss";

const AddBank = () => {
  const initialState = {
    bank_id: "",
    bank_name: "",
    bank_name_ar: "",
  };

  const [bankData, setBankData] = useState(initialState);
  const [error, setErrors] = useState({
    bank_id: getEmptyErrorState(),
    bank_name: getEmptyErrorState(),
    bank_name_ar: getEmptyErrorState(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };
  const { bank_id, bank_name, bank_name_ar } = bankData;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      bank_id: getEmptyErrorState(),
      bank_name: getEmptyErrorState(),
      bank_name_ar: getEmptyErrorState(),
    };
    if (isEmptyString(bank_id)) {
      newErrors.bank_id = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage("Bank Id"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(bank_name)) {
      newErrors.bank_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Bank Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(bank_name_ar)) {
      newErrors.bank_name_ar = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Bank Name Arabic"),
        errorState: "error",
      };
      isValid = false;
    } else if (isArabic(bank_name_ar)) {
      newErrors.bank_name_ar = {
        errorMessage:
          ErrorMessageGenerator.getStringInArabicMessage("Bank Name"),
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
      dispatch(createBank(bankData));
      navigate("/bank", { state: { newData: bankData } });
    }
  };

  const renderAddBankDetailsForm = () => {
    return (
      <>
        <Grid container className={styles.addBank__gridCenter}>
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className={`${styles.addBank__formWidth} form_styles`}>
              <Box className={styles.addBank__formIcon_wrapper}>
                <Typography component="h1" variant="h5">
                  Add Bank
                </Typography>
              </Box>
              <Box
                component="form"
                className={styles.addBank__formContainer}
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Bank Id"
                  name="bank_id"
                  value={bank_id}
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
                {error.bank_id.errorState && (
                  <span className="error">{error.bank_id.errorMessage}</span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bank_name"
                  value={bank_name}
                  label="Bank Name"
                  onChange={(e) => onChange(e)}
                />
                {error.bank_name.errorState && (
                  <span className="error">{error.bank_name.errorMessage}</span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bank_name_ar"
                  value={bank_name_ar}
                  label="Bank Name Arabic"
                  onChange={(e) => onChange(e)}
                />
                {error.bank_name_ar.errorState && (
                  <span className="error">
                    {error.bank_name_ar.errorMessage}
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

  return <>{renderAddBankDetailsForm()}</>;
};

export default AddBank;
