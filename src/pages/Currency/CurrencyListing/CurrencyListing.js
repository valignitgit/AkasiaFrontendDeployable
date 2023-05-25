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
  getAllCurrency,
  deleteCurrency,
} from "../../../redux/slices/currencySlice";
import CurrencyCard from "../CurrencyCard/CurrencyCard";

const CurrencyListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const newData = location.state?.newData;
  const data = useSelector((state) => state.currency?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({ id: "", name: "" });
  const [currencyListing, setCurrencyListing] = useState(data || []);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  console.log("currencyListing", currencyListing);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCurrency());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setCurrencyListing(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setCurrencyListing(data);
    }
  }, [data]);

  useEffect(() => {
    if (newData) {
      setCurrencyListing((prevData) => [...prevData, newData]);
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
      await dispatch(deleteCurrency(id))
        .unwrap()
        .then(() => {
          setOpen(false);
          dispatch(getAllCurrency());
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
  const renderCurrencyList = () => {
    if (Array.isArray(currencyListing)) {
      return (
        <div className={styles.currencyListinging__container}>
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

  return (
    <>
      {renderAddCurrencyButton()}
      {renderCurrencyList()}
      {currencyListing.length > 0 && renderPagination()}
      {renderDialog()}
    </>
  );
};

export default CurrencyListing;
