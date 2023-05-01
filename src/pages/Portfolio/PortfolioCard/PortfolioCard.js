import React from "react";
import { Grid, Box, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const PortfolioCard = ({
  portfolio_name,
  portfolio_name_ar,
  risk_level,
  handleDelete,
  portfolio_id,
}) => {
  const renderPortfolioDetails = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={3}>
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
                  Portfolio Name Arabic:
                </span>
                <span className={styles.portfolioCard__itemValue}>
                  {portfolio_name_ar || "Not Available"}
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
                <Button
                  variant="contained"
                  color="success"
                  className={styles.portfolioCard__btn}
                >
                  View
                </Button>
              </Link>
              <Link to={`/portfolio/update/${portfolio_id}`}>
                <Button
                  variant="contained"
                  className={styles.portfolioCard__btn}
                >
                  Update
                </Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                className={styles.portfolioCard__btn}
                onClick={() => handleDelete(portfolio_id)}
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
