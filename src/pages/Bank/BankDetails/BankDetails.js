import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";
import Loader from "components/Loader/Loader";

import { getBankById, setCurrentData } from "redux/slices/bankSlice";

import styles from "./style.module.scss";

const BankDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBank = useSelector((state) => state.bank?.currentData);
  const { bank_id, bank_name, bank_name_ar } = currentBank || {};

  useEffect(() => {
    dispatch(getBankById(id));
  }, []);

  const renderBankDetails = () => {
    if (
      typeof currentBank === "object" &&
      currentBank !== null &&
      !Array.isArray(currentBank)
    ) {
      return (
        <Grid container className="Details__container">
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className="Details__heading">Bank Details</h1>

            <Card className="Details">
              <CardContent>
                <div className="Details__body">
                  <div>
                    <span className={`${styles.bankDetails__itemKey_width} Details__itemKey`}>
                      Bank ID:
                    </span>
                    <span className={`${styles.bankDetails__itemValue_width} Details__itemValue`}>
                      {bank_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.bankDetails__itemKey_width} Details__itemKey`}>
                      Bank Name:
                    </span>
                    <span className={`${styles.bankDetails__itemValue_width} Details__itemValue`}>
                      {bank_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.bankDetails__itemKey_width} Details__itemKey`}>
                      Bank Name (Arabic):
                    </span>
                    <span
                      className={`${styles.bankDetails__itemValue_width} Details__itemValue text_right`}
                    >
                      {bank_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className="Details__buttonContainer">
                <Link to={"/bank"}>
                  <Button
                    variant="filled"
                    shape="square"
                    className="Details__button"
                    onClick={() => dispatch(setCurrentData())}
                  >
                    Back
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return <Loader />;
    }
  };

  return <>{renderBankDetails()}</>;
};

export default BankDetails;
