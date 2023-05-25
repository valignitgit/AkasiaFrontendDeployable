import React from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Button from "../../../components/Button/CustomButton";

const BankCard = ({ bank_id, bank_name, handleDelete }) => {
  const renderBankCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
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
            </CardContent>
            <div className={styles.bankCard__Actions}>
              <Link to={`/bank/${bank_id}`}>
                <Button className={styles.bankCard__btn} shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/bank/update/${bank_id}`}>
                <Button className={styles.bankCard__btn} shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                className={styles.bankCard__btn}
                onClick={() => handleDelete(bank_id, bank_name)}
                shape="square"
                variant="filled"
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
