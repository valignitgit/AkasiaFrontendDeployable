/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  TextField,
  Paper,
  Grid,
  Box,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import styles from "./style.module.scss";
import { getEmptyErrorState } from "../../utils/AppUtil";
import { isEmptyString } from "../../utils/Validator";
import ErrorMessageGenerator from "../../utils/ErrorMessageGenerator";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import logo from "../../assets/images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    user_id: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [error, setError] = useState({
    user_id: getEmptyErrorState(),
    password: getEmptyErrorState(),
  });
  const { user_id, password } = loginData;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
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
        const data = await dispatch(login(loginData)).unwrap();

        if (
          data &&
          data.status === 200 &&
          data.result &&
          data.message === "Successfully Logged in"
        ) {
          localStorage.setItem("user", JSON.stringify(data.result));
          navigate("/bank");
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
            <Box className={styles.login__formIcon_wrapper}>
              <Box className={styles.login__logoContainer}>
                <img src={logo} alt={logo} className={styles.login__logo} />
              </Box>
            </Box>
            <Box
              component="form"
              className={styles.login__formContainer}
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
                className={styles.login__textInput}
              />
              {error.user_id.errorState && (
                <span className="error">{error.user_id.errorMessage}</span>
              )}

              <FormControl
                fullWidth
                variant="outlined"
                className={styles.login__textInput}
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
