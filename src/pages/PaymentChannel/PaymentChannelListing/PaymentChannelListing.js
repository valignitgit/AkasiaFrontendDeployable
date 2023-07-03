/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import Button from "components/Button/CustomButton";
import DialogBox from "components/DialogBox/DialogBox";
import Loader from "components/Loader/Loader";
import CustomNotification from "components/Notification/CustomNotification";

import {
  deletePaymentChannel,
  getAllPaymentChannels,
  setCurrentData,
} from "redux/slices/paymentChannelSlice";

import { ERROR, SUCCESS } from "utils/constants/constant";

import PaymentChannelCard from "../PaymentChannelCard/PaymentChannelCard";


const PaymentChannelListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.paymentChannel?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({ id: "", name: "" });
  const [paymentChannelListing, setPaymentChannelListing] = useState(
    data || []
  );
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
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

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllPaymentChannels());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setPaymentChannelListing(data);
    }
  }, [data]);

  const handleDelete = (id, name) => {
    setOpen(true);
    setDeletedItem({
      id,
      name,
    });
  };

  const onDelete = async (id) => {
    if (id) {
      await dispatch(deletePaymentChannel(id))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (
            res.data === null &&
            res.status.status === 200 &&
            res.status.message === "Deleted Successfully."
          ) {
            console.log("res", res.status);
            setOpen(false);
            handleOpenNotification(SUCCESS, "Deleted Successfully!");
            dispatch(getAllPaymentChannels());
          } else if (
            res.data.data === null &&
            res.data.status.status === 400 &&
            res.data.status.message === "could not execute statement"
          ) {
            setOpen(false);
            handleOpenNotification(
              ERROR,
              "Payment Channel is already referred!"
            );
            dispatch(getAllPaymentChannels());
            console.log("not deleted");
          }
        });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const lastDataIndex = page * perPage;
  const firstDataIndex = lastDataIndex - perPage;
  const currentPaymentChannels = Array.isArray(paymentChannelListing)
    ? paymentChannelListing.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddPaymentChannelButton = () => (
    <Link to="/payment-channel/add">
      <Button variant="filled" className="Listing__addButton">
        Add Payment Channel
      </Button>
    </Link>
  );

  const renderDeleteDialog = () => {
    const renderActionButtons = () => {
      return (
        <>
          <Button shape="square" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="filled"
            shape="square"
            onClick={() => onDelete(deletedItem.id)}
          >
            Delete
          </Button>
        </>
      );
    };
    const renderDeleteContent = () => {
      return <div>Are you sure you want to delete {deletedItem.name}? </div>;
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

  const renderPaymentChannelList = () => {
    if (Array.isArray(paymentChannelListing)) {
      return (
        <div className="Listing__container">
          <Grid container spacing={2}>
            {currentPaymentChannels.map((paymentChannel) => (
              <PaymentChannelCard
                key={paymentChannel.paymentChannelId}
                {...paymentChannel}
                handleDelete={handleDelete}
              />
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
          count={Math.ceil(paymentChannelListing.length / perPage)}
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
      {renderAddPaymentChannelButton()}
      {renderPaymentChannelList()}
      {paymentChannelListing.length > 0 && renderPagination()}
      {renderDeleteDialog()}
      {renderNotification()}
    </>
  );
};

export default PaymentChannelListing;
