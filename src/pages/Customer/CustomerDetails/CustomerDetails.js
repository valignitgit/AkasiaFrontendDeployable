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
import Loader from "components/Loader/Loader";

import { getCustomerById, updateCustomer } from "redux/slices/customerSlice";

import { convertSnakeCaseToTitleCase } from "utils/AppUtil";
import {
  customerTabData,
  propertyMappings,
} from "utils/constants/customerDetailsData";

import "./style.scss";

const CustomerDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const currentCustomer = useSelector((state) => state.customer.currentData);
  const [sortedCustomerTabData, setSortedCustomerTabData] = useState([]);
  const [originalCustomerData, setOriginalCustomerData] = useState([]);
  const [inputErrors, setInputErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  console.log(currentCustomer);
  const handleTabChange = (e, newValue) => {
    if (!editMode) {
      setActiveTab(newValue);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const data = sortedCustomerTabData[activeTab];
    const tabName = data.key;
    let updatedActiveTabData = { customer_id: id };
    data.properties.forEach((property) => {
      updatedActiveTabData[property.name] = property.value;
    });
    try {
      const res = await dispatch(
        updateCustomer({
          id: tabName,
          data: updatedActiveTabData,
        })
      ).unwrap();
      if (res.status.status === 201 && res.data) {
        dispatch(getCustomerById(id));
        setInputErrors({});
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const handleCancelClick = () => {
    setInputErrors({});
    setSortedCustomerTabData(originalCustomerData);
    setEditMode(false);
  };

  const handleInputChange = (e, property) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let updatedErrors = { ...inputErrors };

    if (name === "current_account_num") {
      if (!/^\d+$/.test(value)) {
        updatedErrors[name] = "Invalid input. Only numbers are allowed.";
        updatedValue = "";
      } else {
        delete updatedErrors[name];
      }
    }

    setSortedCustomerTabData((prevData) => {
      const newData = sortedCustomerTabData.map((tab) => {
        if (tab.name === sortedCustomerTabData[activeTab].name) {
          const updatedProperties = tab.properties.map((prop) => {
            if (prop.name === property.name) {
              return { ...prop, value: updatedValue };
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

    setInputErrors(updatedErrors);
  };

  useEffect(() => {
    dispatch(getCustomerById(id));
  }, []);

  useEffect(() => {
    const transformedData =
      typeof currentCustomer === "object" && currentCustomer !== null
        ? customerTabData.map((tab) => {
            const properties = tab.properties.filter(
              (property) => property in currentCustomer
            );
            const propertiesWithValues = properties.map((property) => ({
              name: property,
              displayName: convertSnakeCaseToTitleCase(property),
              value: currentCustomer[property],
            }));
            return {
              name: tab.name,
              properties: propertiesWithValues,
              key: propertyMappings[tab.name],
            };
          })
        : [];

    setSortedCustomerTabData(transformedData);
    setOriginalCustomerData(transformedData);
  }, [currentCustomer]);

  const activeTabData = sortedCustomerTabData[activeTab]?.properties || [];

  const renderTabs = () => {
    if (currentCustomer === null || Object.keys(currentCustomer).length === 0) {
      return <Loader />;
    }

    return (
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
            disabled={editMode && index !== activeTab}
          />
        ))}
      </Tabs>
    );
  };

  const renderTabDetailsTable = () => {
    if (currentCustomer === null || Object.keys(currentCustomer).length === 0) {
      return;
    }

    return (
      <div className="customerDetails__table__container">
        <TableContainer component={Paper} className="customerDetails__table">
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
                        <div className="customerDetails__table__editinput__container">
                          <TextField
                            name={property.name}
                            value={property.value}
                            onChange={(e) => handleInputChange(e, property)}
                            onKeyPress={handleKeyPress}
                          />
                          {inputErrors[property.name] && (
                            <span className="error">
                              {inputErrors[property.name]}
                            </span>
                          )}
                        </div>
                      ) : property.value !== null ? (
                        property.value
                      ) : (
                        "NA"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!editMode ? (
          <div className="customerDetails__button__container">
            {activeTab !== 0 && (
              <Button
                onClick={handleEditClick}
                shape="square"
                variant="filled"
                type="submit"
              >
                Edit
              </Button>
            )}
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
            <Button onClick={handleCancelClick} shape="square" variant="filled">
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Grid container className="customerdetails__container">
      <Grid item lg={8} className="customerdetails__container__gridItem">
        <div>
          {renderTabs()}
          {renderTabDetailsTable()}
        </div>
      </Grid>
    </Grid>
  );
};

export default CustomerDetails;
