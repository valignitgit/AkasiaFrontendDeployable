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
  deleteCurrency,
  getAllCurrencies,
  setCurrentData,
} from "redux/slices/currencySlice";

import { ERROR, SUCCESS } from "utils/constants/constant";

import CurrencyCard from "../CurrencyCard/CurrencyCard";

import styles from "./style.module.scss";

const CurrencyListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currency?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({ id: "", name: "" });
  const [currencyListing, setCurrencyListing] = useState(data || []);
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
    dispatch(getAllCurrencies());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setCurrencyListing(data);
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
      await dispatch(deleteCurrency(id))
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
            dispatch(getAllCurrencies());
          } else if (
            res.data.data === null &&
            res.data.status.status === 400 &&
            res.data.status.message === "could not execute statement"
          ) {
            setOpen(false);
            handleOpenNotification(ERROR, "Currency is already referred!");
            dispatch(getAllCurrencies());
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
  const currentCurrency = Array.isArray(currencyListing)
    ? currencyListing.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddCurrencyButton = () => (
    <Link to="/currency/add">
      <Button variant="filled" className={styles.addCurrencyButton}>
        Add Currency
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
  const renderCurrencyList = () => {
    if (Array.isArray(currencyListing)) {
      return (
        <div className={styles.currencyListing__container}>
          <Grid container spacing={2}>
            {currentCurrency.map((currency) => (
              <CurrencyCard
                key={currency.currency_id}
                {...currency}
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
      <div className={styles.currencyListing__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(currencyListing.length / perPage)}
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
      {renderAddCurrencyButton()}
      {renderCurrencyList()}
      {currencyListing.length > 0 && renderPagination()}
      {renderDeleteDialog()}
      {renderNotification()}
    </>
  );
};

export default CurrencyListing;
