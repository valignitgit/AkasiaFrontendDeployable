import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const BankCard = ({ bank_id, bank_name, bank_name_ar, handleDelete }) => {
  const renderBankCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card className={styles.bankCard}>
            <CardContent>
              <Box className={styles.bankCard__containWrapper}>
                <Typography
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
              <Link to={`/bank/${bank_id}`}>
                <Button
                  variant="contained"
                  color="success"
                  className={styles.bankCard__btn}
                >
                  View
                </Button>
              </Link>
              <Link to={`/bank/update/${bank_id}`}>
                <Button variant="contained" className={styles.bankCard__btn}>
                  Update
                </Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                className={styles.bankCard__btn}
                onClick={() => handleDelete(bank_id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        </Grid>
      </>
    );
  };
  return <>{renderBankCard()}</>;
};

export default BankCard;
