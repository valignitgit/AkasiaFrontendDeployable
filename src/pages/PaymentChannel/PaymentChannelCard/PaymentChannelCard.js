import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

import styles from "./style.module.scss";

const PaymentChannelCard = ({
  paymentChannelId,
  paymentChannelName,
  paymentChannelNameAr,
  handleDelete,
}) => {
  const renderPaymentChannelCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={styles.paymentChannelCard}>
            <CardContent>
              <Box className={styles.paymentChannelCard__containWrapper}>
                <span className={styles.paymentChannelCard__itemKey}>
                  Payment Channel ID:
                </span>
                <span className={styles.paymentChannelCard__itemValue}>
                  {paymentChannelId}
                </span>
              </Box>
              <br />
              <Box className={styles.paymentChannelCard__containWrapper}>
                <span className={styles.paymentChannelCard__itemKey}>
                  Payment Channel Name:
                </span>
                <span className={styles.paymentChannelCard__itemValue}>
                  {paymentChannelName || "Not Available"}
                </span>
              </Box>
              <br />
              <Box className={styles.paymentChannelCard__containWrapper}>
                <span className={styles.paymentChannelCard__itemKey}>
                  Payment Channel Name (Arabic):
                </span>
                <span className={styles.paymentChannelCard__itemValue}>
                  {paymentChannelNameAr || "Not Available"}
                </span>
              </Box>
              <br />
            </CardContent>
            <div className={styles.paymentChannelCard__Actions}>
              <Link to={`/payment-channel/${paymentChannelId}`}>
                <Button
                  className={styles.paymentChannelCard__btn}
                  shape="square"
                >
                  View
                </Button>
              </Link>
              <Link to={`/payment-channel/update/${paymentChannelId}`}>
                <Button
                  className={styles.paymentChannelCard__btn}
                  shape="square"
                >
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className={styles.paymentChannelCard__btn}
                onClick={() =>
                  handleDelete(paymentChannelId, paymentChannelName)
                }
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

  return <>{renderPaymentChannelCard()}</>;
};

export default PaymentChannelCard;
