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
  deleteCountry,
  getAllCountries,
  setCurrentData,
} from "../../../redux/slices/countrySlice";
import CountryCard from "../CountryCard/CountryCard";

const CountryListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const newData = location.state?.newData;
  const data = useSelector((state) => state.country?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({ id: "", name: "" });
  const [countryListing, setCountryListing] = useState(data || []);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setCountryListing(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setCountryListing(data);
    }
  }, []);

  useEffect(() => {
    if (newData) {
      setCountryListing((prevData) => [...prevData, newData]);
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
      await dispatch(deleteCountry(id))
        .unwrap()
        .then((res) => {
          setOpen(false);
          dispatch(getAllCountries());
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
  const currentCountry = Array.isArray(countryListing)
    ? countryListing.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddCountryButton = () => (
    <Link to="/country/add">
      <Button variant="filled" className={styles.addCountryButton}>
        Add Country
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

  const renderCountryList = () => {
    if (Array.isArray(countryListing)) {
      return (
        <div className={styles.countryListing__container}>
          <Grid container spacing={2}>
            {currentCountry.map((country) => (
              <CountryCard
                key={country.country_id}
                {...country}
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
      <div className={styles.countryListing__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(countryListing.length / perPage)}
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
      {renderAddCountryButton()}
      {renderCountryList()}
      {renderPagination()}
      {renderDialog()}
    </>
  );
};

export default CountryListing;
