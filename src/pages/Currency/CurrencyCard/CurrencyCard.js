import React from "react";
import { Grid, Box, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Button from "../../../components/Button/CustomButton";

const CurrencyCard = ({ currency_id, currency_name, handleDelete }) => {
  const renderCurrencyDetails = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={styles.currencyCard}>
            <CardContent>
              <Box className={styles.currencyCard__containWrapper}>
                <span className={styles.currencyCard__itemKey}>
                  Currency Id:
                </span>
                <span className={styles.currencyCard__itemValue}>
                  {currency_id}
                </span>
              </Box>
              <br />
              <Box className={styles.currencyCard__containWrapper}>
                <span className={styles.currencyCard__itemKey}>
                  Currency Name:
                </span>
                <span className={styles.currencyCard__itemValue}>
                  {currency_name || "Not Available"}
                </span>
              </Box>
              <br />
            </CardContent>
            <div className={styles.currencyCard__Actions}>
              <Link to={`/currency/${currency_name}`}>
                <Button className={styles.currencyCard__btn} shape="square">
                  View
                </Button>
              </Link>
              <Button
                shape="square"
                className={styles.currencyCard__btn}
                onClick={() => handleDelete(currency_name)}
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
  return <>{renderCurrencyDetails()}</>;
};

export default CurrencyCard;
