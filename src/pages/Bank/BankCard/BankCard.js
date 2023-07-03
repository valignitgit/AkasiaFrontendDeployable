import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import Button from "components/Button/CustomButton";

const BankCard = ({ bank_id, bank_name, handleDelete }) => {
  const renderBankCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className="Card">
            <CardContent className="card__contentContainer">
              <Box className="Card__containWrapper">
                <Typography
                  component="h4"
                  variant="p"
                  className="Card__itemKey"
                >
                  Bank Id:
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  className="Card__itemValue"
                >
                  {bank_id}
                </Typography>
              </Box>
              <br />
              <Box className="Card__containWrapper">
                <Typography
                  component="h4"
                  variant="p"
                  className="Card__itemKey"
                >
                  Bank Name:
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  className="Card__itemValue"
                >
                  {bank_name}
                </Typography>
              </Box>
            </CardContent>
            <div className="Card__Actions">
              <Link to={`/bank/${bank_id}`}>
                <Button className="Card__btn" shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/bank/update/${bank_id}`}>
                <Button className="Card__btn" shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                className="Card__btn"
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
