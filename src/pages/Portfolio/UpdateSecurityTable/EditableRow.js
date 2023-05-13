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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const EditableRow = ({
  handleEditFormChange,
  editFormData,
  handleEditFormSubmit,
  handleCancelClick,
  securityOptions,
}) => {
  return (
    <TableRow>
      <TableCell align="center">
        <FormControl sx={{ width: "250px" }}>
          <InputLabel htmlFor="name-multiple">Security</InputLabel>

          <Select
            name="security_id"
            value={editFormData.security_id}
            onChange={handleEditFormChange}
            label="Security"
          >
            {securityOptions.map((option) => (
              <MenuItem key={option.security_id} value={option.security_id}>
                {`${option.security_id} - ${option.security_name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <TextField
          fullWidth
          name="weightage_pct"
          value={editFormData.weightage_pct}
          onChange={handleEditFormChange}
          placeholder="Weightage"
          sx={{ width: "100px" }}
        />
      </TableCell>

      <TableCell align="center">
        <>
          <IconButton onClick={(e) => handleEditFormSubmit(e)}>
            <SaveIcon />
          </IconButton>

          <IconButton onClick={handleCancelClick}>
            <CloseIcon />
          </IconButton>
        </>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
