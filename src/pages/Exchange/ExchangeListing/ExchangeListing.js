/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import DialogBox from "../../../components/DialogBox/DialogBox";
import { FormControl, Select, MenuItem } from "@mui/material";
import Loader from "../../../components/Loader/Loader";
import styles from "./style.module.scss";
import Pagination from "@mui/material/Pagination";
import Button from "../../../components/Button/CustomButton";
import { useLocation } from "react-router-dom";
import {
  deleteExchange,
  getAllExchanges,
} from "../../../redux/slices/exchangeSlice";
import ExchangeCard from "../ExchangeCard/ExchangeCard";

const ExchangeListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const newData = location.state?.newData;
  const data = useSelector((state) => state.exchange?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    id: "",
    name: "",
  });
  const [exchangeListing, setExchangeListing] = useState(data || []);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  console.log("exchangeListing", data);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllExchanges());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setExchangeListing(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setExchangeListing(data);
    }
  }, []);

  useEffect(() => {
    if (newData) {
      setExchangeListing((prevData) => [...prevData, newData]);
    }
  }, [newData]);

  const handleDelete = (id, name) => {
    setOpen(true);
    setDeletedItem({
      id,
      name,
    });
  };

  const onDelete = async (id) => {
    if (id)
      await dispatch(deleteExchange(id))
        .unwrap()
        .then(() => {
          setOpen(false);
          dispatch(getAllExchanges());
        });
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

  return (
    <>
      {renderAddExchangeButton()}
      {renderExchangeList()}
      {exchangeListing.length > 0 && renderPagination()}
      {renderDialog()}
    </>
  );
};

export default ExchangeListing;
