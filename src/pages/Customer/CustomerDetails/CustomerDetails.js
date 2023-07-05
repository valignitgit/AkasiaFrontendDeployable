/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";

import Button from "components/Button/CustomButton";

import { getCustomerById, updateCustomer } from "redux/slices/customerSlice";

import { customerTabData } from "utils/constants/customerDetailsData";

import "./style.scss";

const transformPropertyName = (propertyName) => {
  const words = propertyName.split("_");
  const transformedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return transformedWords.join(" ");
};
const CustomerDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const currentCustomer = useSelector((state) => state.customer.currentData);
  const [sortedCustomerTabData, setSortedCustomerTabData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const handleTabChange = (e, newValue) => {
    console.log(newValue);
    setActiveTab(newValue);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const data = sortedCustomerTabData[activeTab]; // Get the updated active tab data

    let updatedActiveTabData = { customer_id: id };
    data.properties.forEach((property) => {
      updatedActiveTabData[property.name] = property.value;
    });
    console.log(updatedActiveTabData);
    try {
      const res = await dispatch(
        updateCustomer({
          id: "address",
          data: updatedActiveTabData,
        })
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (e, property) => {
    const { value } = e.target;
    setSortedCustomerTabData((prevData) => {
      const newData = sortedCustomerTabData.map((tab) => {
        if (tab.name === sortedCustomerTabData[activeTab].name) {
          const updatedProperties = tab.properties.map((prop) => {
            if (prop.name === property.name) {
              return { ...prop, editedValue: value };
            }
            return prop;
          });
          return {
            ...tab,
            properties: updatedProperties,
          };
        }
        return tab;
      });
      return newData;
    });
  };

  useEffect(() => {
    dispatch(getCustomerById(id));
  }, []);

  useEffect(() => {
    const propertyMappings = {
      Overview: "overview",
      Address: "address",
      Employment: "employment",
      Income: "income",
      "Risk Appetite": "risk_appetite",
      Compliance: "compliance",
      "Bank Account": "bank_account",
    };

    const transformedData =
      typeof currentCustomer === "object" && currentCustomer !== null
        ? customerTabData.map((tab) => {
            const properties = tab.properties.filter(
              (property) => property in currentCustomer
            );
            const propertiesWithValues = properties.map((property) => ({
              name: property,
              displayName: transformPropertyName(property),
              value: currentCustomer[property],
              editedValue: currentCustomer[property],
              key: propertyMappings[property.toLowerCase().replace(/ /g, "_")],
            }));
            return {
              name: tab.name,
              properties: propertiesWithValues,
              key: propertyMappings[tab.name],
            };
          })
        : [];

    setSortedCustomerTabData(transformedData);
  }, [currentCustomer]);

  const activeTabData = sortedCustomerTabData[activeTab]?.properties || [];
  console.log(activeTabData);
  // const [activeTabDetails, setActiveTabDetails] = useState(
  //   {
  //     tabName: activeTabData.name || "",
  //     tabIndex: activeTab,
  //     tabKey: activeTabData.key || "",
  //     tabData: activeTabData,
  //   } || {}
  // );
  // console.log(activeTabDetails);
  console.log(sortedCustomerTabData);
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
            {sortedCustomerTabData.map((tab, index) => (
              <Tab
                key={index}
                label={tab.name}
                className="customerDetails__tab"
              />
            ))}
          </Tabs>
          <div className="customerDetails__table__container">
            <TableContainer
              component={Paper}
              className="customerDetails__table"
            >
              <Table className="customerDetails__table__content">
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeTabData &&
                    activeTabData.map((property, index) => (
                      <TableRow key={index}>
                        <TableCell>{property.displayName}</TableCell>
                        <TableCell>
                          {editMode ? (
                            <TextField
                              // label={property.displayName}
                              name={property.name}
                              value={property.editedValue}
                              onChange={(e) => handleInputChange(e, property)}
                            />
                          ) : property.value !== null ? (
                            property.value
                          ) : (
                            "NA"
                          )}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {!editMode ? (
              <div className="customerDetails__button__container">
                {/* {activeTab !== 0 && (
                  <Button
                    onClick={handleEditClick}
                    shape="square"
                    variant="filled"
                    type="submit"
                  >
                    Edit
                  </Button>
                )} */}
              </div>
            ) : (
              <div className="customerDetails__button__container">
                <Button
                  onClick={handleSaveClick}
                  shape="square"
                  variant="filled"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelClick}
                  shape="square"
                  variant="filled"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CustomerDetails;
