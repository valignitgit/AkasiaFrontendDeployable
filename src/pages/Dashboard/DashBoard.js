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
//   const [passwordFields, setPasswordFields] = useState({
//     oldPassword: { value: "", show: false },
//     newPassword: { value: "", show: false },
//     repeatPassword: { value: "", show: false },
//   });
//   const { oldPassword, newPassword, repeatPassword } = passwordFields;

//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const email = user?.email;

//   const onChange = (e) => {
//     setPasswordFields({
//       ...passwordFields,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const togglePasswordVisibility = (fieldName) => {
//     setPasswordFields((prevState) => ({
//       ...prevState,
//       [fieldName]: {
//         ...prevState[fieldName],
//         show: !prevState[fieldName].show,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { oldPassword, newPassword, repeatPassword } = passwordFields;
//     const data = {
//       oldPassword: oldPassword.value,
//       newPassword: newPassword.value,
//       repeatPassword: repeatPassword.value,
//     };
//     dispatch(changePassword({ email, data }));
//   };

//   const handleCancelClick = () => {
//     handleCloseDialog();
//     setPasswordFields(initialState);
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
//               type={oldPassword.show ? "text" : "password"}
//               value={oldPassword.value}
//               name="oldPassword"
//               onChange={(e) => onChange(e)}
//               autoComplete="off"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => togglePasswordVisibility("oldPassword")}
//                     edge="end"
//                   >
//                     {oldPassword.show ? <VisibilityOff /> : <Visibility />}
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
//               type={newPassword.show ? "text" : "password"}
//               value={newPassword.value}
//               name="newPassword"
//               onChange={(e) => onChange(e)}
//               autoComplete="off"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => togglePasswordVisibility(newPassword)}
//                     edge="end"
//                   >
//                     {newPassword.show ? <VisibilityOff /> : <Visibility />}
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
//               type={repeatPassword.show ? "text" : "password"}
//               value={repeatPassword.value}
//               name="repeatPassword"
//               onChange={(e) => onChange(e)}
//               autoComplete="off"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => togglePasswordVisibility(repeatPassword)}
//                     edge="end"
//                   >
//                     {repeatPassword.show ? <VisibilityOff /> : <Visibility />}
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
