import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateExchange,
  resetExchangeState,
} from "../../../redux/slices/exchangeSlice";
import ExchangeService from "../../../services/ExchangeServices";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import styles from "../AddExchange/style.module.scss";
import Button from "../../../components/Button/CustomButton";

const UpdateExchange = () => {
  const initialState = {
    exchange_id: "",
    exchange_name: "",
    exchange_name_ar: "",
  };
  const [currentExchange, setcurrentExchange] = useState(initialState);
  const [error, setErrors] = useState({
    exchange_id: getEmptyErrorState(),
    exchange_name: getEmptyErrorState(),
    exchange_name_ar: getEmptyErrorState(),
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setcurrentExchange({ ...currentExchange, [e.target.name]: e.target.value });
  };
  const { exchange_id, exchange_name, exchange_name_ar } = currentExchange;
  console.log("currentExchange", currentExchange);

  const getExchange = (id) => {
    ExchangeService.getExchangeById(id)
      .then((res) => {
        setcurrentExchange(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getExchange(id);
  }, []);

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
    } else if (isArabic(exchange_name_ar)) {
      newErrors.exchange_name_ar = {
        errorMessage:
          ErrorMessageGenerator.getStringInArabicMessage("Exchange Name"),
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
          updateExchange({ id: exchange_id, data: currentExchange })
        ).unwrap();
        console.log(response);
        dispatch(resetExchangeState());
        navigate("/exchange");
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const renderUpdateExchangeDetailsForm = () => {
    return (
      <Grid container className={styles.addExchange__gridCenter}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
          <Paper className={`${styles.addExchange__formWidth} form_styles`}>
            <Box className={styles.addExchange__formIcon_wrapper}>
              <Typography component="h1" variant="h5">
                Update Exchange
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
                autoComplete="email"
                autoFocus
                onChange={(e) => onChange(e)}
                disabled={true}
              />
              {error.exchange_id.errorState && (
                <span className="error">{error.exchange_id.errorMessage}</span>
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
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />
              {error.exchange_name_ar.errorState && (
                <span className="error">
                  {error.exchange_name_ar.errorMessage}
                </span>
              )}
              <div className="buttons_container">
                <Button className="mt_10" variant="filled" type="submit">
                  Update
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
    );
  };

  return <>{renderUpdateExchangeDetailsForm()}</>;
};

export default UpdateExchange;
