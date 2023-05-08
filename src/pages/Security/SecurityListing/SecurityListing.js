import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import SecurityCard from "../SecurityCard/SecurityCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSecurity } from "../../../redux/slices/securitySlice";
import "./styles.module.scss";
import Loader from "../../../components/Loader/Loader";
import Pagination from "@mui/material/Pagination";
import { Grid, FormControl, Select, MenuItem } from "@mui/material";
import Button from "../../../components/Button/CustomButton";

const SecurityListing = () => {
  const dispatch = useDispatch();
  const securityList = useSelector((state) => state.security?.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const currentSecurityPage = Array.from(securityList).slice(
    firstDataIndex,
    lastDataIndex
  );

  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePerPageChange = (e) => {
    setDataPerPage(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllSecurity());
  }, [dispatch]);
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
        <Grid container spacing={2} className={styles.securityCard_container}>
          {currentSecurityPage.map((card) => (
            <SecurityCard
              key={card.security_id}
              isSingleSecurityCard={false}
              {...card}
            />
          ))}
        </Grid>
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
    <div className={styles.securityContainer}>
      {renderAddSecurityButton()}
      {renderSecurityCards()}
      {securityList.length > 0 && renderPagination()}
    </div>
  );
};

export default SecurityListing;
