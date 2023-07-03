import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

const PortfolioCard = ({
  portfolio_name,
  risk_level,
  handleDelete,
  portfolio_id,
}) => {
  const renderPortfolioDetails = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className="Card">
            <CardContent className="card__contentContainer">
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">
                  Portfolio Name:
                </span>
                <span className="Card__itemValue">
                  {portfolio_name}
                </span>
              </Box>
              <br />
              <Box className="Card__containWrapper">
                <span className="Card__itemKey">
                  Risk Level:
                </span>

                <span className="Card__itemValue">
                  {risk_level}
                </span>
              </Box>
            </CardContent>
            <div className="Card__Actions">
              <Link to={`/portfolio/${portfolio_id}`}>
                <Button className="Card__btn" shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/portfolio/update/${portfolio_id}`}>
                <Button className="Card__btn" shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className="Card__btn"
                onClick={() => handleDelete(portfolio_id, portfolio_name)}
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
  return <>{renderPortfolioDetails()}</>;
};

export default PortfolioCard;
