import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import SecurityCard from "../SecurityCard/SecurityCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSecurities,
  setCurrentData,
} from "../../../redux/slices/securitySlice";
import "./styles.module.scss";
import Loader from "../../../components/Loader/Loader";
import { Grid, FormControl, Select, MenuItem, Pagination } from "@mui/material";
import Button from "../../../components/Button/CustomButton";

const SecurityListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const newData = location.state?.newData;
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
    if (Array.isArray(data)) {
      setSecurityList(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setSecurityList(data);
    }
  });

  useEffect(() => {
    if (newData) {
      setSecurityList((prevData) => [...prevData, newData]);
    }
  }, [newData]);

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
