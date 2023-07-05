/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

import Button from "components/Button/CustomButton";
import DialogBox from "components/DialogBox/DialogBox";
import Loader from "components/Loader/Loader";
import CustomNotification from "components/Notification/CustomNotification";

import { getAllCustomers } from "redux/slices/customerSlice";

import { ERROR, SUCCESS } from "utils/constants/constant";

const CustomerListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer?.data);
  const [bankList, setBankList] = useState(data || []);
  console.log(bankList);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    id: "",
    name: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleOpenNotification = (notificationType, notificationMessage) => {
    setNotification({
      open: true,
      type: notificationType,
      message: notificationMessage,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      open: false,
      type: "",
      message: "",
    });
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setBankList(data);
    }
  }, [data]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const lastDataIndex = page * perPage;
  const firstDataIndex = lastDataIndex - perPage;
  const currentBanks = Array.isArray(bankList)
    ? bankList.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderDialog = () => {
    const renderActionButtons = () => {
      return (
        <>
          <Button shape="square" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="filled" shape="square">
            Delete
          </Button>
        </>
      );
    };
    const renderDeleteContent = () => {
      return <div>Are sure you want to delete {deletedItem.name}? </div>;
    };
    return (
      <>
        <DialogBox
          open={open}
          handleClose={handleClose}
          title="Delete"
          content={renderDeleteContent()}
          actions={renderActionButtons()}
        />
      </>
    );
  };
  const renderBankList = () => {
    if (Array.isArray(bankList)) {
      return (
        <div className="Listing__container">
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "50px",
              paddingLeft: "30px",
              flexDirection: "column",
            }}
          >
            {currentBanks?.map((bank) => (
              <Card sx={{ marginBottom: "20px" }} key={bank.customer_id}>
                <Link to={`/customer/${bank.customer_id}`}>
                  <Box sx={{ color: "black", marginBottom: "10px" }}>
                    {bank.customer_id}
                  </Box>
                  <Box sx={{ color: "black" }}>{bank.customer_name}</Box>
                </Link>
              </Card>
            ))}
          </Grid>
        </div>
      );
    } else {
      return <Loader />;
    }
  };
  const renderPagination = () => {
    return (
      <div className="Listing__paginationContainer">
        <Pagination
          color="primary"
          count={Math.ceil(bankList.length / perPage)}
          page={page}
          onChange={handlePageChange}
        />
        <FormControl>
          <Select value={perPage} onChange={handlePerPageChange}>
            <MenuItem value={4}>4 per page</MenuItem>
            <MenuItem value={8}>8 per page</MenuItem>
            <MenuItem value={12}>12 per page</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };
  const renderNotification = () => {
    return (
      <CustomNotification
        open={notification.open}
        type={notification.type}
        message={notification.message}
        handleClose={handleCloseNotification}
      />
    );
  };

  return (
    <>
      {renderBankList()}
      {bankList.length > 0 && renderPagination()}
      {renderDialog()}
      {renderNotification()}
    </>
  );
};

export default CustomerListing;
