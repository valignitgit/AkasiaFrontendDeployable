import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormControl, Grid, MenuItem, Pagination, Select } from "@mui/material";

import Button from "components/Button/CustomButton";
import DialogBox from "components/DialogBox/DialogBox";
import Loader from "components/Loader/Loader";
import CustomNotification from "components/Notification/CustomNotification";

import {
  deleteExchange,
  getAllExchanges,
  setCurrentData,
} from "redux/slices/exchangeSlice";

import { ERROR, SUCCESS } from "utils/constants/constant";

import ExchangeCard from "../ExchangeCard/ExchangeCard";

import styles from "./style.module.scss";

const ExchangeListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.exchange?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    id: "",
    name: "",
  });
  const [exchangeListing, setExchangeListing] = useState(data || []);
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
    dispatch(getAllExchanges());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setExchangeListing(data);
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
      await dispatch(deleteExchange(id))
        .unwrap()
        .then((res) => {
          if (
            res.data === null &&
            res.status.status === 200 &&
            res.status.message === "Deleted Successfully."
          ) {
            setOpen(false);
            handleOpenNotification(SUCCESS, "Deleted Successfully!");
            dispatch(getAllExchanges());
          } else if (
            res.data.data === null &&
            res.data.status.status === 400 &&
            res.data.status.message === "could not execute statement"
          ) {
            setOpen(false);
            handleOpenNotification(ERROR, "Exchange is already referred!");
            dispatch(getAllExchanges());
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
  const currentExchange = Array.isArray(exchangeListing)
    ? exchangeListing.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddExchangeButton = () => (
    <Link to="/exchange/add">
      <Button variant="filled" className={styles.addExchangeButton}>
        Add Exchange
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

  const renderExchangeList = () => {
    if (Array.isArray(exchangeListing)) {
      return (
        <div className={styles.exchangeListing__container}>
          <Grid container spacing={2}>
            {currentExchange.map((exchange) => (
              <ExchangeCard
                key={exchange.exchange_id}
                {...exchange}
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
      <div className={styles.exchangeListing__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(exchangeListing.length / perPage)}
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
      {renderAddExchangeButton()}
      {renderExchangeList()}
      {exchangeListing.length > 0 && renderPagination()}
      {renderDialog()}
      {renderNotification()}
    </>
  );
};

export default ExchangeListing;
