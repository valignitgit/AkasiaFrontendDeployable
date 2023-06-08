import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

import styles from "./style.module.scss";

const ExchangeCard = ({ exchange_id, exchange_name, handleDelete }) => {
  const renderExchangeCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={styles.exchangeCard}>
            <CardContent>
              <Box className={styles.exchangeCard__containWrapper}>
                <span className={styles.exchangeCard__itemKey}>
                  Exchange Id:
                </span>
                <span className={styles.exchangeCard__itemValue}>
                  {exchange_id}
                </span>
              </Box>
              <br />
              <Box className={styles.exchangeCard__containWrapper}>
                <span className={styles.exchangeCard__itemKey}>
                  Exchange Name:
                </span>
                <span className={styles.exchangeCard__itemValue}>
                  {exchange_name || "Not Available"}
                </span>
              </Box>
              <br />
            </CardContent>
            <div className={styles.exchangeCard__Actions}>
              <Link to={`/exchange/${exchange_id}`}>
                <Button className={styles.exchangeCard__btn} shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/exchange/update/${exchange_id}`}>
                <Button className={styles.exchangeCard__btn} shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className={styles.exchangeCard__btn}
                onClick={() => handleDelete(exchange_id, exchange_name)}
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

  return <>{renderExchangeCard()}</>;
};

export default ExchangeCard;
