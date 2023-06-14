import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormControl, Grid, MenuItem, Pagination, Select } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getAllSecurities, setCurrentData } from "redux/slices/securitySlice";

import SecurityCard from "../SecurityCard/SecurityCard";

import styles from "./styles.module.scss";

const SecurityListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.security?.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [securityList, setSecurityList] = useState(data || []);
  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const currentSecurityPage = Array.isArray(securityList)
    ? securityList.slice(firstDataIndex, lastDataIndex)
    : [];
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handlePerPageChange = (e) => {
    setDataPerPage(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllSecurities());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setSecurityList(data);
    }
  }, [data]);

  const renderAddSecurityButton = () => {
    return (
      <Link to="/security/add">
        <Button variant="filled" className={styles.addSecurityButton}>
          Add Security
        </Button>
      </Link>
    );
  };
  const renderSecurityCards = () => {
    if (Array.isArray(securityList)) {
      return (
        <div className={styles.securityListing_container}>
          <Grid container spacing={2}>
            {currentSecurityPage.map((card) => (
              <SecurityCard
                key={card.security_id}
                isSingleSecurityCard={false}
                {...card}
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
      <div className={styles.securityListing__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(securityList.length / dataPerPage)}
          page={currentPage}
          onChange={handleCurrentPageChange}
        />
        <FormControl>
          <Select value={dataPerPage} onChange={handlePerPageChange}>
            <MenuItem value={4}>4 Per Page</MenuItem>
            <MenuItem value={8}>8 Per Page</MenuItem>
            <MenuItem value={12}>12 Per Page</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };
  return (
    <>
      {renderAddSecurityButton()}
      {renderSecurityCards()}
      {securityList.length > 0 && renderPagination()}
    </>
  );
};

export default SecurityListing;
