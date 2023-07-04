/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Tab, Tabs } from "@mui/material";

import { getCustomerById } from "redux/slices/customerSlice";

import {
  customerTabData,
  customerTabLabels,
} from "utils/constants/customerDetailsData";

import "./style.scss";

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const currentCustomer = useSelector((state) => state.customer.currentData);
  console.log(currentCustomer);
  const sortedCustomerTabData =
    typeof currentCustomer === "object" && currentCustomer !== null
      ? customerTabData.map((tab) => {
          const properties = tab.properties.filter(
            (property) => property in currentCustomer
          );
          const propertiesWithValues = properties.map((property) => ({
            name: property,
            value: currentCustomer[property],
          }));
          return {
            name: tab.name,
            properties: propertiesWithValues,
          };
        })
      : [];

  console.log(sortedCustomerTabData);

  const [activeTab, setActiveTab] = useState(0);
  const activeTabData = customerTabData[activeTab];

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getCustomerById("2d6c7678-c53f-434f-8639-daa3b7c03bc1"));
  }, []);

  return (
    <Grid container className="customerdetails__container">
      <Grid
        item
        // md={10}
        lg={8}
        className="customerdetails__container__gridItem"
      >
        <div>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="customerDetails__tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            {customerTabLabels.map((label, index) => (
              <Tab key={index} label={label} className="customerDetails__tab" />
            ))}
          </Tabs>
          <div>{activeTabData.name}</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CustomerDetails;
