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
  const rowsPerPageOptions = [10, 20, 30];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRowClick = (rowId) => {
    if (onRowClick) {
      onRowClick(rowId);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPage = rows.slice(startIndex, endIndex);

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
            {currentPage.map((row) => (
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
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default CustomTable;
