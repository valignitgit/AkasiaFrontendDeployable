import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

const OmniBusAccountCard = ({
  omnibusAccountId,
  bankAccountName,
  handleDelete,
}) => {
  const renderOmniBusAccountCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className="Card">
            <CardContent className="card__contentContainer">
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">Omnibus Account ID:</span>
                <span className="Card__itemValue">{omnibusAccountId}</span>
              </Box>
              <br />
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">Bank Account Name:</span>
                <span className="Card__itemValue">{bankAccountName}</span>
              </Box>
              <br />
            </CardContent>
            <div className="Card__Actions">
              <Link to={`/omnibus-account/${omnibusAccountId}`}>
                <Button className="Card__btn" shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/omnibus-account/update/${omnibusAccountId}`}>
                <Button className="Card__btn" shape="square">
                  Edit
                </Button>
              </Link>
              <Button
                shape="square"
                className="Card__btn"
                onClick={() => handleDelete(omnibusAccountId, bankAccountName)}
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

  return <>{renderOmniBusAccountCard()}</>;
};

export default OmniBusAccountCard;
