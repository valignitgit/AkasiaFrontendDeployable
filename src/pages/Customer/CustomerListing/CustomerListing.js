/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";

import Loader from "components/Loader/Loader";
import Table from "components/Table/Table";

import { getAllCustomers } from "redux/slices/customerSlice";

import { rowData } from "utils/customerUtil";

import "./style.scss";

const CustomerListing = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.customer);
  const [customerList, setCustomerList] = useState(data || []);
  const [rows, setRows] = useState([]);
  const [activeRow, setActiveRow] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setCustomerList(data);
    }
    const rows = customerList.map((customer) => ({
      customer_name: customer.customer_name,
      national_id: customer.national_id,
      phone_num: customer.phone_num,
      status: customer.status,
    }));
  }, [data]);

  useEffect(() => {
    const rowData = customerList.map((customer) => ({
      id: customer.customer_id,
      customer_name: customer.customer_name,
      national_id: customer.national_id,
      status: customer.status,
      phone_num: customer.phone_num,
    }));
    setRows(rowData);
  }, [customerList]);

  const columns = [
    { id: "customer_name", label: "Customer Name" },
    { id: "national_id", label: "National Id" },
    { id: "phone_num", label: "Phone Number" },
    { id: "status", label: "Status" },
    // Add more columns as needed
  ];

  const handleRowClick = (rowId) => {
    setActiveRow(rowId);
    setTimeout(() => {
      navigate(`/customer/${rowId}`);
    }, 100);
  };

  const renderCustomerTable = () => {
    return (
      <Table
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        activeRow={activeRow}
      />
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Grid container className="customerListing__container">
          <Grid
            item
            sm={10}
            mg={10}
            lg={12}
            className="customerListing__gridItem"
          >
            {renderCustomerTable()}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CustomerListing;
