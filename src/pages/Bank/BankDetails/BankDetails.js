import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Button from "../../../components/Button/CustomButton";
import Loader from "../../../components/Loader/Loader";
import { getBankById, setCurrentData } from "../../../redux/slices/bankSlice";

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
        <Grid container className={styles.bankDetails__container}>
          <Grid item xs={12} sm={8} md={8} lg={5} xl={4}>
            <h1 className={styles.bankDetails__heading}>Bank Details</h1>

            <Card className={styles.bankDetails}>
              <CardContent>
                <div className={styles.bankDetails__body}>
                  <div>
                    <span className={styles.bankDetails__itemKey}>
                      Bank ID:
                    </span>
                    <span className={styles.bankDetails__itemValue}>
                      {bank_id || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.bankDetails__itemKey}>
                      Bank Name:
                    </span>
                    <span className={styles.bankDetails__itemValue}>
                      {bank_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.bankDetails__itemKey}>
                      Bank Name (Arabic):
                    </span>
                    <span
                      className={`${styles.bankDetails__itemValue} text_right`}
                    >
                      {bank_name_ar || "NA"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardActions className={styles.bankDetails__buttonContainer}>
                <Link to={"/bank"}>
                  <Button
                    variant="filled"
                    shape="square"
                    className={styles.bankDetails__button}
                    onClick={() => dispatch(setCurrentData())}
                  >
                    Ok
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
