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
  deleteBroker,
  getAllBrokers,
  setCurrentData,
} from "redux/slices/brokerSlice";

import { ERROR, SUCCESS } from "utils/constants/constant";

import BrokerCard from "../BrokerCard/BrokerCard";

import styles from "./style.module.scss";

const BrokerListingPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.broker?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    id: "",
    name: "",
  });
  const [brokerListing, setBrokerListing] = useState(data || []);
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
    dispatch(getAllBrokers());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setBrokerListing(data);
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
      await dispatch(deleteBroker(id))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (
            res.data === null &&
            res.status.status === 200 &&
            res.status.message === "Deleted Successfully"
          ) {
            setOpen(false);
            handleOpenNotification(SUCCESS, "Deleted Successfully!");
            dispatch(getAllBrokers());
          } else if (
            res.data.data === null &&
            res.data.status.status === 400 &&
            res.data.status.message === "could not execute statement"
          ) {
            setOpen(false);
            handleOpenNotification(ERROR, "Broker is already referred!");
            dispatch(getAllBrokers());
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
  const currentBrokers = Array.isArray(brokerListing)
    ? brokerListing.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddBrokerButton = () => (
    <Link to="/broker/add">
      <Button variant="filled" className={styles.addBrokerButton}>
        Add Broker
      </Button>
    </Link>
  );

  const renderDialog = () => {
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

  const renderBrokerList = () => {
    if (Array.isArray(brokerListing)) {
      return (
        <div className={styles.brokerListing__container}>
          <Grid container spacing={2}>
            {currentBrokers.map((broker) => (
              <BrokerCard
                key={broker.broker_id}
                {...broker}
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
      <div className={styles.brokerListing__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(brokerListing.length / perPage)}
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
      {renderAddBrokerButton()}
      {renderBrokerList()}
      {brokerListing.length > 0 && renderPagination()}
      {renderDialog()}
      {renderNotification()}
    </>
  );
};

export default BrokerListingPage;
