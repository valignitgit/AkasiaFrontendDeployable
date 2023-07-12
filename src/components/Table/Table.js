/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";

import "./style.scss";

const CustomTable = ({ columns, rows, onRowClick, activeRow, pagination }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [10, 25, 50];

  const handleRowClick = (rowId) => {
    if (onRowClick) {
      onRowClick(rowId);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer>
        <Table className="custom__table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="custom__table__body">
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row.id)}
                className={activeRow === row.id ? "activeRow" : ""}
              >
                {columns.map((column) => (
                  <TableCell key={column.id}>{row[column.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default CustomTable;
