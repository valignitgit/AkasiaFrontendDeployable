import React from "react";
import {
  TableRow,
  TableCell,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";

const EditableRow = ({
  handleEditFormChange,
  editFormData,
  handleEditFormSubmit,
  handleCancelClick,
  securityOptions,
}) => {
  return (
    <TableRow>
      <TableCell>
        <FormControl fullWidth>
          <InputLabel>Security</InputLabel>

          <Select
            name="security_id"
            value={editFormData.security_id}
            onChange={handleEditFormChange}
            label="Security"
            className={styles.securityTable_selectEdit}
          >
            {securityOptions.map((option) => (
              <MenuItem key={option.security_id} value={option.security_id}>
                {`${option.security_id} - ${option.security_name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="left">
        <TextField
          fullWidth
          name="weightage_pct"
          value={editFormData.weightage_pct}
          onChange={handleEditFormChange}
          placeholder="Weightage"
          className={styles.securityTable_TextEdit}
        />
      </TableCell>

      <TableCell align="center">
        <Box className={styles.securityTable_editBtnContainer}>
          <IconButton onClick={(e) => handleEditFormSubmit(e)}>
            <SaveIcon />
          </IconButton>

          <IconButton onClick={handleCancelClick}>
            <CloseIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
