// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import DialogBox from "../../../components/DialogBox/DialogBox";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { VisibilityOff, Visibility } from "@mui/icons-material";
// import Button from "../../../components/Button/CustomButton";
// import styles from "./style.module.scss";
// import { useDispatch } from "react-redux";
// import { changePassword } from "../../../redux/slices/authSlice";

// const ChangePasswordDialog = ({ openDialog, handleCloseDialog }) => {
//   const initialState = {
//     oldPassword: "",
//     newPassword: "",
//     repeatPassword: "",
//   };
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const [changePasswordData, setChangePasswordData] = useState(initialState);
//   const { oldPassword, newPassword, repeatPassword } = changePasswordData;
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const email = user?.email;

//   const onChange = (e) => {
//     setChangePasswordData({
//       ...changePasswordData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       oldPassword,
//       newPassword,
//       repeatPassword,
//     };
//     dispatch(changePassword({ email, data: changePasswordData }));
//   };

//   const handleCancelClick = () => {
//     handleCloseDialog();
//     setChangePasswordData(initialState);
//   };

//   const renderDialog = () => {
//     const renderTitle = () => {
//       return <h4 className={styles.changePassword_title}>Change Password</h4>;
//     };
//     const renderChangePasswordForm = () => {
//       return (
//         <Box
//           component="form"
//           className={styles.changePassword_form}
//           onSubmit={handleSubmit}
//         >
//           <FormControl
//             variant="outlined"
//             className={styles.changePassword_formInput}
//           >
//             <InputLabel>Current Password</InputLabel>
//             <OutlinedInput
//               type={showPassword ? "text" : "password"}
//               value={oldPassword}
//               name="oldPassword"
//               onChange={(e) => onChange(e)}
//               autoComplete="off"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Current Password"
//             />
//           </FormControl>
//           <FormControl
//             variant="outlined"
//             className={styles.changePassword_formInput}
//           >
//             <InputLabel>New Password</InputLabel>
//             <OutlinedInput
//               type={showPassword ? "text" : "password"}
//               value={newPassword}
//               name="newPassword"
//               onChange={(e) => onChange(e)}
//               autoComplete="off"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="New Password"
//             />
//           </FormControl>

//           <FormControl
//             variant="outlined"
//             className={styles.changePassword_formInput}
//             fullWidth
//           >
//             <InputLabel>Confirm Password</InputLabel>
//             <OutlinedInput
//               type={showPassword ? "text" : "password"}
//               value={repeatPassword}
//               name="repeatPassword"
//               onChange={(e) => onChange(e)}
//               autoComplete="off"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Confirm Password"
//             />
//           </FormControl>
//           <Box className={styles.changePassword_btnContainer}>
//             <Button shape="square" onClick={handleCancelClick}>
//               Cancel
//             </Button>
//             <Button shape="square" type="submit">
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       );
//     };
//     return (
//       <>
//         <DialogBox
//           open={openDialog}
//           handleClose={handleCloseDialog}
//           title={renderTitle()}
//           content={renderChangePasswordForm()}
//         />
//       </>
//     );
//   };

//   return <div>{renderDialog()}</div>;
// };

// export default ChangePasswordDialog;
