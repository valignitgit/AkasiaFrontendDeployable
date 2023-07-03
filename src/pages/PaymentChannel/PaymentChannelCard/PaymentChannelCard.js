import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

import "./style.scss";

const PaymentChannelCard = ({
  paymentChannelId,
  paymentChannelName,
  handleDelete,
}) => {
  const renderPaymentChannelCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className="Card">
            <CardContent className="card__contentContainer">
              <Box className="Card__containWrapper">
                <span className="Card__itemKey paymentChannelCard__keyWidth">
                  Payment Channel ID:
                </span>
                <span className="Card__itemValue paymentChannelCard__itemWidth">
                  {paymentChannelId}
                </span>
              </Box>
              <br />
              <Box className="Card__containWrapper">
                <span className="Card__itemKey paymentChannelCard__keyWidth">
                  Payment Channel Name:
                </span>
                <span className="Card__itemValue paymentChannelCard__itemWidth">
                  {paymentChannelName || "Not Available"}
                </span>
              </Box>
              <br />
            </CardContent>

            <div className="Card__Actions">
              <Link to={`/payment-channel/${paymentChannelId}`}>
                <Button className="Card__btn" shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/payment-channel/update/${paymentChannelId}`}>
                <Button className="Card__btn" shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className="Card__btn"
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
