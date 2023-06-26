/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import PaymentChannelService from "services/PaymentChannelServices";

import Button from "components/Button/CustomButton";

import { updatePaymentChannel } from "redux/slices/paymentChannelSlice";

import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

const UpdatePaymentChannel = () => {
  const initialState = {
    paymentChannelId: "",
    paymentChannelName: "",
    paymentChannelNameAr: "",
  };

  const [currentPaymentChannel, setCurrentPaymentChannel] =
    useState(initialState);
  const [error, setErrors] = useState({
    paymentChannelId: getEmptyErrorState(),
    paymentChannelName: getEmptyErrorState(),
    paymentChannelNameAr: getEmptyErrorState(),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCurrentPaymentChannel({
      ...currentPaymentChannel,
      [e.target.name]: e.target.value,
    });
  };
  const { paymentChannelId, paymentChannelName, paymentChannelNameAr } =
    currentPaymentChannel;

  const getCurrentPaymentChannel = (id) => {
    PaymentChannelService.getPaymentChannelById(id)
      .then((res) => {
        currentPaymentChannel(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCurrentPaymentChannel(id);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      paymentChannelId: getEmptyErrorState(),
      paymentChannelName: getEmptyErrorState(),
      paymentChannelNameAr: getEmptyErrorState(),
    };
    if (isEmptyString(paymentChannelId)) {
      newErrors.paymentChannelId = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Payment Channel Id"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(paymentChannelName)) {
      newErrors.paymentChannelName = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Payment Channel Name"
        ),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(paymentChannelNameAr)) {
      newErrors.paymentChannelNameAr = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Payment Channel Name Arabic"
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
          updatePaymentChannel(currentPaymentChannel)
        ).unwrap();
        if (response.data) {
          navigate("/payment-channel");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderUpdatePaymentChannelDetailsForm = () => {
    return (
      <>
        <Grid container className="form__gridCenter">
          <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
            <Paper className=" form_styles">
              <Box className="form__headingWrapper">
                <Typography component="h1" variant="h5">
                  Update Payment Channel
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
                  name="paymentChannelId"
                  value={paymentChannelId}
                  label="Payment Channel Id"
                  onChange={(e) => onChange(e)}
                />
                {error.paymentChannelId.errorState && (
                  <span className="error">
                    {error.paymentChannelId.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="paymentChannelName"
                  value={paymentChannelName}
                  label="Payment Channel Name"
                  onChange={(e) => onChange(e)}
                />
                {error.paymentChannelName.errorState && (
                  <span className="error">
                    {error.paymentChannelName.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="paymentChannelNameAr"
                  value={paymentChannelNameAr}
                  label="Payment Channel Name Arabic"
                  onChange={(e) => onChange(e)}
                  className="textInput__rightAlighed"
                />
                {error.paymentChannelNameAr.errorState && (
                  <span className="error">
                    {error.paymentChannelNameAr.errorMessage}
                  </span>
                )}
                <div className="buttons_container">
                  <Button variant="filled" type="submit">
                    Submit
                  </Button>
                  <Link to="/payment-channel">
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

  return <>{renderUpdatePaymentChannelDetailsForm()}</>;
};

export default UpdatePaymentChannel;
