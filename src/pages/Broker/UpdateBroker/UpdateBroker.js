/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBroker } from "../../../redux/slices/brokerSlice";
import BrokerService from "../../../services/BrokerServices";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import styles from "../AddBroker/style.module.scss";
import Button from "../../../components/Button/CustomButton";

const UpdateBroker = () => {
  const initialState = {
    broker_id: "",
    broker_name: "",
    broker_name_ar: "",
    currency_id: "",
    investment_account_id: "",
    bank_account_id: "",
    broker_abbr: "",
  };
  const [currentBroker, setCurrentBroker] = useState(initialState);
  const [error, setErrors] = useState({
    broker_id: getEmptyErrorState(),
    broker_name: getEmptyErrorState(),
    broker_name_ar: getEmptyErrorState(),
    currency_id: getEmptyErrorState(),
    investment_account_id: getEmptyErrorState(),
    bank_account_id: getEmptyErrorState(),
    broker_abbr: getEmptyErrorState(),
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCurrentBroker({ ...currentBroker, [e.target.name]: e.target.value });
  };
  const {
    broker_id,
    broker_name,
    broker_name_ar,
    currency_id,
    investment_account_id,
    bank_account_id,
    broker_abbr,
  } = currentBroker;
  console.log("currentBroker", currentBroker);

  const getBroker = (id) => {
    BrokerService.getBrokerById(id)
      .then((res) => {
        setCurrentBroker(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getBroker(id);
  }, []);

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
    } else if (isArabic(broker_name_ar)) {
      newErrors.broker_name_ar = {
        errorMessage:
          ErrorMessageGenerator.getStringInArabicMessage("Broker Name"),
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
          updateBroker({ id: broker_id, data: currentBroker })
        ).unwrap();
        navigate(`/broker/${broker_id}`);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const renderUpdateBrokerDetailsForm = () => {
    return (
      <Grid container className={styles.addBroker__gridCenter}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
          <Paper className={`${styles.addBroker__formWidth} form_styles`}>
            <Box className={styles.addBroker__formIcon_wrapper}>
              <Typography component="h1" variant="h5">
                Update Broker
              </Typography>
            </Box>
            <Box
              component="form"
              className={styles.addBroker__formContainer}
              onSubmit={handleSubmit}
              noValidate
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Broker Id"
                name="broker_id"
                value={broker_id}
                autoComplete="email"
                autoFocus
                onChange={(e) => onChange(e)}
                disabled={true}
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
                <span className="error">{error.broker_name.errorMessage}</span>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="broker_name_ar"
                value={broker_name_ar}
                label="Broker Name Arabic"
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />
              {error.broker_name_ar.errorState && (
                <span className="error">
                  {error.broker_name_ar.errorMessage}
                </span>
              )}

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
                <span className="error">{error.currency_id.errorMessage}</span>
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
                <span className="error">{error.broker_abbr.errorMessage}</span>
              )}
              <div className="buttons_container">
                <Button className="mt_10" variant="filled" type="submit">
                  Update
                </Button>
                <Link to="/broker">
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

  return <>{renderUpdateBrokerDetailsForm()}</>;
};

export default UpdateBroker;
