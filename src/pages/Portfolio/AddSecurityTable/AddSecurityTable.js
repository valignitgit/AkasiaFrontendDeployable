import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { nanoid } from "nanoid";

import Button from "components/Button/CustomButton";

import { getAllSecurities } from "redux/slices/securitySlice";
import {
  setAddFormData,
  setData,
  setEditFormData,
  setEditRowId,
} from "redux/slices/securityTableSlice";

import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import { isEmptyString } from "utils/Validator";

import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

import styles from "./styles.module.scss";

const AddSecurityTable = () => {
  const [error, setErrors] = useState({
    security: getEmptyErrorState(),
    weightage: getEmptyErrorState(),
  });

  const columns = ["Security", "Weightage", "Action"];
  const dispatch = useDispatch();
  const { data, addFormData, editFormData, editRowId } = useSelector(
    (state) => state.securityTableData
  );
  const { security_id, weightage_pct } = addFormData;
  const securityData = useSelector((state) => state.security.data);
  const securityOptions = securityData.map(
    ({ security_name, security_id }) => ({
      security_name,
      security_id,
    })
  );

  const handleAddFormChange = (e) => {
    e.preventDefault();
    dispatch(
      setAddFormData({
        ...addFormData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      security: getEmptyErrorState(),
      weightage: getEmptyErrorState(),
    };
    if (isEmptyString(security_id)) {
      newErrors.security = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Security"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(weightage_pct)) {
      newErrors.weightage = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Weightage"),
        errorState: "error",
      };
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newData = {
      id: nanoid(),
      ...addFormData,
    };

    const isValid = validateForm();
    if (isValid) {
      dispatch(setData([...data, newData]));
      dispatch(
        setAddFormData({
          security_id: "",
          weightage_pct: "",
        })
      );
    }
  };

  const handleEditFormChange = (e) => {
    dispatch(
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleEditClick = (event, row) => {
    event.preventDefault();
    dispatch(setEditRowId(row.id));
    dispatch(setEditFormData(row));
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedRow = {
      id: editRowId,
      ...editFormData,
    };
    const newData = data.map((item) =>
      item.id === editRowId ? editedRow : item
    );
    dispatch(setData(newData));
    dispatch(setEditRowId(null));
  };

  const handleCancelClick = () => {
    dispatch(setEditRowId(null));
  };

  const handleDeleteClick = (rowId) => {
    const newData = data.filter((item) => item.id !== rowId);
    dispatch(setData(newData));
  };
  useEffect(() => {
    dispatch(getAllSecurities());
  }, []);

  return (
    <>
      <Box className={styles.addSecurityTable__Container}>
        <Box component="form" className={styles.addSecurityTable__form}>
          <Box className={styles.addSecurityTable_selectInput}>
            <FormControl fullWidth>
              <InputLabel>Security</InputLabel>

              <Select
                name="security_id"
                onChange={handleAddFormChange}
                placeholder="Security"
                label="Security"
                value={security_id}
              >
                {securityOptions.map((option) => (
                  <MenuItem key={option.security_id} value={option.security_id}>
                    {`${option.security_id} - ${option.security_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {error.security.errorState && (
              <span className="error">{error.security.errorMessage}</span>
            )}
          </Box>
          <Box className={styles.addSecurityTable_textInput}>
            <TextField
              fullWidth
              name="weightage_pct"
              onChange={handleAddFormChange}
              placeholder="Weightage"
              label="Weightage"
              value={weightage_pct}
              className="textInput__rightAlighed"
            />
            {error.weightage.errorState && (
              <span className="error">{error.weightage.errorMessage}</span>
            )}
          </Box>
          <Button
            variant="filled"
            onClick={handleAddFormSubmit}
            className={styles.addSecurityTable__addBtn}
            shape="square"
          >
            Add
          </Button>
        </Box>
      </Box>
      {data.length ? (
        <TableContainer className={styles.addSecurityTable_dataTableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} align="center">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((row) => (
                <>
                  {editRowId === row.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                      securityOptions={securityOptions}
                    />
                  ) : (
                    <ReadOnlyRow
                      row={row}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={() => handleDeleteClick(row.id)}
                    />
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};

export default AddSecurityTable;
