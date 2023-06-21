// import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";

const CustomNotificationBar = ({ open, type, message, handleClose }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomNotificationBar;
