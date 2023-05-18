/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DialogBox from "../../../components/DialogBox/DialogBox";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Button from "../../../components/Button/CustomButton";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/slices/authSlice";

const ChangePasswordDialog = ({ openDialog, handleCloseDialog }) => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState(initialState);
  const { oldPassword, newPassword, repeatPassword } = changePasswordData;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const onChange = (e) => {
    setChangePasswordData({
      ...changePasswordData,
      [e.target.name]: e.target.value,
    });
  };
  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword((prevState) => !prevState);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const handleToggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  const handleCancelClick = () => {
    handleCloseDialog();
    setChangePasswordData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        changePassword({ email, data: changePasswordData })
      ).unwrap();
      console.log(response);
      if (response === "Password Changed Successfully") {
        alert("Password changed successfully");
      } else if (
        response.data === "New Password & Repeat password Should be Same" &&
        response.status === 400
      ) {
        alert("New Password & Confirm password Should be Same");
      } else if (
        response.data === "Current Password Is Not Matching." &&
        response.status === 400
      ) {
        alert("Current Password Is Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderDialog = () => {
    const renderTitle = () => {
      return <h4 className={styles.changePassword_title}>Change Password</h4>;
    };
    const renderChangePasswordForm = () => {
      return (
        <Box
          component="form"
          className={styles.changePassword_form}
          onSubmit={handleSubmit}
        >
          <FormControl
            variant="outlined"
            className={styles.changePassword_formInput}
          >
            <InputLabel>Current Password</InputLabel>
            <OutlinedInput
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              name="oldPassword"
              onChange={(e) => onChange(e)}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleToggleOldPasswordVisibility}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Current Password"
            />
          </FormControl>
          <FormControl
            variant="outlined"
            className={styles.changePassword_formInput}
          >
            <InputLabel>New Password</InputLabel>
            <OutlinedInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              name="newPassword"
              onChange={(e) => onChange(e)}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleToggleNewPasswordVisibility}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>

          <FormControl
            variant="outlined"
            className={styles.changePassword_formInput}
            fullWidth
          >
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              name="repeatPassword"
              onChange={(e) => onChange(e)}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleToggleRepeatPasswordVisibility}
                    edge="end"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <Box className={styles.changePassword_btnContainer}>
            <Button shape="square" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button shape="square" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      );
    };
    return (
      <>
        <DialogBox
          open={openDialog}
          handleClose={handleCloseDialog}
          title={renderTitle()}
          content={renderChangePasswordForm()}
        />
      </>
    );
  };

  return <div>{renderDialog()}</div>;
};

export default ChangePasswordDialog;
