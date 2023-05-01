import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBankById } from "../../../redux/slices/bankSlice";
import styles from "../BankCard/style.module.scss";
import { Link } from "react-router-dom";

const BankDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => ({
    ...state.bank,
  }));
  useEffect(() => {
    dispatch(getBankById(id));
  }, []);

  const { bank_id, bank_name, bank_name_ar } = data;
  const renderBankDetails = () => {
    return (
      <Grid container spacing={4} className={styles.bankDetails__wrapper}>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <h2 className={styles.bankDetails__heading}>Bank Details</h2>

          <Card className={styles.bankCard}>
            <CardContent>
              <Box className={styles.bankCard__containWrapper}>
                <Typography
                  color="text.secondary"
                  component="h4"
                  variant="p"
                  className={styles.bankCard__itemKey}
                >
                  Bank Id:
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  className={styles.bankCard__itemValue}
                >
                  {bank_id}
                </Typography>
              </Box>
              <br />
              <Box className={styles.bankCard__containWrapper}>
                <Typography
                  color="text.secondary"
                  component="h4"
                  variant="p"
                  className={styles.bankCard__itemKey}
                >
                  Bank Name:
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  className={styles.bankCard__itemValue}
                >
                  {bank_name}
                </Typography>
              </Box>

              <br />
              <Box className={styles.bankCard__containWrapper}>
                <Typography
                  component="h4"
                  variant="p"
                  className={styles.bankCard__itemKey}
                >
                  Bank Name Arabic:
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  className={styles.bankCard__itemValue}
                >
                  {bank_name_ar || "Not Available"}
                </Typography>
              </Box>
            </CardContent>
            <div className={styles.bankCard__Actions}>
              <Link to={`/bank/update/${bank_id}`}>
                <Button variant="contained" className={styles.bankCard__btn}>
                  Update
                </Button>
              </Link>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  };
  return <>{renderBankDetails()}</>;
};

export default BankDetails;
