import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

import styles from "./styles.module.scss";

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
          <Card className={styles.portfolio__card}>
            <CardContent>
              <Box className={styles.portfolioCard__containWrapper}>
                <span className={styles.portfolioCard__itemKey}>
                  Portfolio Name:
                </span>
                <span className={styles.portfolioCard__itemValue}>
                  {portfolio_name}
                </span>
              </Box>
              <br />
              <Box className={styles.portfolioCard__containWrapper}>
                <span className={styles.portfolioCard__itemKey}>
                  Risk Level:
                </span>

                <span className={styles.portfolioCard__itemValue}>
                  {risk_level}
                </span>
              </Box>
            </CardContent>
            <div className={styles.portfolioCard__Actions}>
              <Link to={`/portfolio/${portfolio_id}`}>
                <Button className={styles.portfolioCard__btn} shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/portfolio/update/${portfolio_id}`}>
                <Button className={styles.portfolioCard__btn} shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className={styles.portfolioCard__btn}
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
