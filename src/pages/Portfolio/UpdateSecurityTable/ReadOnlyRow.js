import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ row, handleEditClick, handleDeleteClick }) => {
  return (
    <TableRow key={row.id}>
      <TableCell align="center">{row.security_id}</TableCell>
      <TableCell align="center">{row.weightage_pct}%</TableCell>
      <TableCell align="center">
        <IconButton onClick={(e) => handleEditClick(e, row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;
