import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

const BrokerCard = ({ broker_id, broker_name, handleDelete }) => {
  const renderBrokerCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className="Card">
            <CardContent className="card__contentContainer">
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">Broker Id:</span>
                <span className="Card__itemValue">
                  {broker_id}
                </span>
              </Box>
              <br />
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">Broker Name:</span>
                <span className="Card__itemValue">
                  {broker_name || "Not Available"}
                </span>
              </Box>
            </CardContent>
            <div className="Card__Actions">
              <Link to={`/broker/${broker_id}`}>
                <Button className="Card__btn" shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/broker/update/${broker_id}`}>
                <Button className="Card__btn" shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className="Card__btn"
                onClick={() => handleDelete(broker_id, broker_name)}
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

  return <>{renderBrokerCard()}</>;
};

export default BrokerCard;
