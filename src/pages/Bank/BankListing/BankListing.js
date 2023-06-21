import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormControl, Grid, MenuItem, Pagination, Select } from "@mui/material";

import Button from "components/Button/CustomButton";
import DialogBox from "components/DialogBox/DialogBox";
import Loader from "components/Loader/Loader";
import CustomNotification from "components/Notification/CustomNotification";

import {
  deleteBank,
  getAllBanks,
  setCurrentData,
} from "redux/slices/bankSlice";

import { ERROR, SUCCESS } from "utils/constants/constant";

import BankCard from "../BankCard/BankCard";

import styles from "./styles.module.scss";

const BankListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bank?.data);
  const [bankList, setBankList] = useState(data || []);
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
    dispatch(getAllBanks());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setBankList(data);
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
      await dispatch(deleteBank(id))
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
            dispatch(getAllBanks());
          } else if (
            res.data.data === null &&
            res.data.status.status === 400 &&
            res.data.status.message === "could not execute statement"
          ) {
            setOpen(false);
            handleOpenNotification(ERROR, "Bank is already referred!");
            dispatch(getAllBanks());
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
  const currentBanks = Array.isArray(bankList)
    ? bankList.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddBankButton = () => (
    <Link to="/bank/add">
      <Button variant="filled" className={styles.addBankButton}>
        Add Bank
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
  const renderBankList = () => {
    if (Array.isArray(bankList)) {
      return (
        <div className={styles.bankListing__container}>
          <Grid container spacing={2}>
            {currentBanks?.map((bank) => (
              <BankCard
                key={bank.bank_id}
                {...bank}
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
      <div className={styles.bankListing__paginationContainer}>
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
      {renderAddBankButton()}
      {renderBankList()}
      {bankList.length > 0 && renderPagination()}
      {renderDialog()}
      {renderNotification()}
    </>
  );
};

export default BankListing;
