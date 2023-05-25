/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import Button from "../../../components/Button/CustomButton";
import styles from "../AddCurrency/style.module.scss";
import { updateCurrency } from "../../../redux/slices/currencySlice";
import CurrencyService from "../../../services/CurrencyServices";

const UpdateCurrency = () => {
  const initialState = {
    currency: "",
    currency_id: "",
    currency_name: "",
    currency_name_ar: "",
  };

  const [currentCurrency, seCurrentCurrency] = useState(initialState);
  const [error, setErrors] = useState({
    currency: getEmptyErrorState(),
    currency_id: getEmptyErrorState(),
    currency_name: getEmptyErrorState(),
    currency_name_ar: getEmptyErrorState(),
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    seCurrentCurrency({ ...currentCurrency, [e.target.name]: e.target.value });
  };
  const { currency, currency_id, currency_name, currency_name_ar } =
    currentCurrency;

  const getCurrency = (id) => {
    CurrencyService.getCurrencyById(id)
      .then((res) => {
        seCurrentCurrency(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCurrency(id);
  }, []);

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
      try {
        const data = await dispatch(
          updateCurrency({ id: currency_name, data: currentCurrency })
        ).unwrap();

        navigate(`/currency/${currency_name}`, {
          state: { newData: currentCurrency },
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const renderUpdateCurrencyDetailsForm = () => {
    return (
      <>
        <Grid container className={styles.addCurrency__gridCenter}>
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className={`${styles.addCurrency__formWidth} form_styles`}>
              <Box className={styles.addCurrency__formIcon_wrapper}>
                <Typography component="h1" variant="h5">
                  Update Currency
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
                <div className="buttons_container">
                  <Button
                    variant="filled"
                    type="submit"
                    className={styles.addBtn}
                  >
                    Update
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

  return <>{renderUpdateCurrencyDetailsForm()}</>;
};

export default UpdateCurrency;
