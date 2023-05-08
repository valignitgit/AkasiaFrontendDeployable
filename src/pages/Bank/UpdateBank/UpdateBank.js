import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBank } from "../../../redux/slices/bankSlice";
import BankService from "../../../services/BankServices";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import styles from "../AddBank/style.module.scss";
import Button from "../../../components/Button/CustomButton";

const UpdateBank = () => {
  const initialState = {
    bank_id: "",
    bank_name: "",
    bank_name_ar: "",
  };
  const [currentBank, setcurrentBank] = useState(initialState);
  const [error, setErrors] = useState({
    bank_id: getEmptyErrorState(),
    bank_name: getEmptyErrorState(),
    bank_name_ar: getEmptyErrorState(),
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setcurrentBank({ ...currentBank, [e.target.name]: e.target.value });
  };
  const { bank_id, bank_name, bank_name_ar } = currentBank;

  const getBank = (id) => {
    BankService.getById(id)
      .then((res) => {
        setcurrentBank(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getBank(id);
  }, []);

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
      dispatch(updateBank({ id: bank_id, data: currentBank }));
      navigate(`/bank/${id}`);
    }
  };
  const renderUpdateBankDetailsForm = () => {
    return (
      <Grid container className={styles.addBank__gridCenter}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
          <Paper className={`${styles.addBank__formWidth} form_styles`}>
            <Box className={styles.addBank__formIcon_wrapper}>
              <Typography component="h1" variant="h5">
                Update Bank
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
                autoComplete="email"
                autoFocus
                onChange={(e) => onChange(e)}
                disabled={true}
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
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />
              {error.bank_name_ar.errorState && (
                <span className="error">{error.bank_name_ar.errorMessage}</span>
              )}

              <Button
                className="mt_10"
                variant="filled"
                type="submit"
                fullWidth
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  return <>{renderUpdateBankDetailsForm()}</>;
};

export default UpdateBank;
