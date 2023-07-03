import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import logo from "assets/images/logo.jpeg";

import Button from "components/Button/CustomButton";
import CustomNotification from "components/Notification/CustomNotification";

import { login, setLoginData } from "redux/slices/authSlice";

import { getEmptyErrorState } from "utils/AppUtil";
import { WARNING } from "utils/constants/constant";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

import styles from "./style.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleOpen = (notificationType, notificationMessage) => {
    setNotification({
      open: true,
      type: notificationType,
      message: notificationMessage,
    });
  };

  const handleClose = () => {
    setNotification({
      open: false,
      type: "",
      message: "",
    });
  };

  const loginData = useSelector((state) => state.auth.loginData);

  const [error, setError] = useState({
    user_id: getEmptyErrorState(),
    password: getEmptyErrorState(),
  });
  const { user_id, password } = loginData;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onChange = (e) => {
    // Dispatch an action to update the loginData in the Redux store
    dispatch(setLoginData({ [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      user_id: getEmptyErrorState(),
      password: getEmptyErrorState(),
    };
    if (isEmptyString(user_id)) {
      newErrors.user_id = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage("User Id"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(password)) {
      newErrors.password = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Password"),
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
      try {
        const response = await dispatch(login(loginData)).unwrap();
        if (
          response &&
          response.status.status === 200 &&
          response.data &&
          response.status.message === "Login Successfull."
        ) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/bank");
        } else if (
          response &&
          response.status === 400 &&
          response.data === "Bad credentials"
        ) {
          handleOpen(WARNING, "Password is incorrect!");
          // alert("Password is incorrect");
        } else if (
          response &&
          response.status === 404 &&
          response.data === "No value present | No User Found"
        ) {
          handleOpen(WARNING, "User Id is incorrect!");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <Container fixed>
      <Grid container className={styles.loginContainer}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Paper className={`${styles.login__form} form_styles`}>
            <Box className="form__headingWrapper">
              <Box className={styles.login__logoContainer}>
                <img src={logo} alt={logo} className={styles.login__logo} />
              </Box>
            </Box>
            <Box
              component="form"
              className="form__container"
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                fullWidth
                name="user_id"
                value={user_id}
                label="User Id"
                onChange={(e) => onChange(e)}
                autoComplete="off"
                className="form__textInput"
              />
              {error.user_id.errorState && (
                <span className="error">{error.user_id.errorMessage}</span>
              )}

              <FormControl
                fullWidth
                variant="outlined"
                className="form__textInput"
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {error.password.errorState && (
                <span className="error">{error.password.errorMessage}</span>
              )}

              <Button
                variant="filled"
                type="submit"
                className={styles.login__submitBtn}
                fullWidth
              >
                Login
              </Button>
              <CustomNotification
                open={notification.open}
                type={notification.type}
                message={notification.message}
                handleClose={handleClose}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
