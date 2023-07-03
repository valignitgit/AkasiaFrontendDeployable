import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";


const CurrencyCard = ({ currency_id, currency_name, handleDelete }) => {
  const renderCurrencyCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className="Card">
            <CardContent className="card__contentContainer">
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">
                  Currency Id:
                </span>
                <span className="Card__itemValue">
                  {currency_id}
                </span>
              </Box>
              <br />
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">
                  Currency Name:
                </span>
                <span className="Card__itemValue">
                  {currency_name || "Not Available"}
                </span>
              </Box>
              <br />
            </CardContent>
            <div className="Card__Actions">
              <Link to={`/currency/${currency_id}`}>
                <Button className="Card__btn" shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/currency/update/${currency_id}`}>
                <Button className="Card__btn" shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className="Card__btn"
                onClick={() => handleDelete(currency_id, currency_name)}
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
  return <>{renderCurrencyCard()}</>;
};

export default CurrencyCard;
