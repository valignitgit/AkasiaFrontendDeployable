import React, { useEffect } from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioById } from "../../../redux/slices/portfolioSlice";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/CustomButton";

const PortfolioDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio?.data);
  useEffect(() => {
    dispatch(getPortfolioById(id));
  }, []);
  const {
    portfolioSecurities,
    portfolio_name,
    portfolio_name_ar,
    risk_level,
    avg_growth_pct,
  } = portfolio;

  const renderPortfolioDetails = () => {
    return (
      <>
        <Grid
          container
          spacing={4}
          className={styles.portfolioDetails__wrapper}
        >
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <h2 className={styles.portfolioDetails__heading}>
              Portfolio Details
            </h2>
            <Card className={styles.portfolioDetails}>
              <CardContent>
                <Box className={styles.portfolioDetails__containWrapper}>
                  <Typography
                    component="h4"
                    variant="p"
                    className={styles.portfolioDetails__itemKey}
                  >
                    Portfolio Name
                  </Typography>
                  <Typography
                    component="p"
                    variant="p"
                    className="text_uppercase"
                  >
                    {portfolio_name}
                  </Typography>
                </Box>
                <br />
                <Box className={styles.portfolioDetails__containWrapper}>
                  <Typography
                    component="h4"
                    variant="p"
                    className={styles.portfolioDetails__itemKey}
                  >
                    Portfolio Name Arabic
                  </Typography>
                  <Typography component="p" variant="p">
                    {portfolio_name_ar ? portfolio_name_ar : "غير متاح"}
                  </Typography>
                </Box>
                <br />
                <Box className={styles.portfolioDetails__containWrapper}>
                  <Typography
                    component="h4"
                    variant="p"
                    className={styles.portfolioDetails__itemKey}
                  >
                    Risk Level
                  </Typography>

                  <Typography
                    component="p"
                    variant="p"
                    className="text_capitalize"
                  >
                    {risk_level}
                  </Typography>
                </Box>
                <br />
                <Box className={styles.portfolioDetails__containWrapper}>
                  <Typography
                    component="h4"
                    variant="p"
                    className={styles.portfolioDetails__itemKey}
                  >
                    Avarage Growth Pecentage
                  </Typography>
                  <Typography component="p" variant="p">
                    {avg_growth_pct}%
                  </Typography>
                </Box>
                <br />
                <Typography
                  component="h3"
                  variant="p"
                  className={styles.portfolioDetails__itemKey}
                >
                  Securities
                </Typography>
                {portfolioSecurities?.length > 0 ? (
                  <Box className={styles.portfolioDetails__containWrapper}>
                    {portfolioSecurities?.map(
                      ({ security_id, weightage_pct }) => (
                        <Box
                          className={
                            styles.portfolioDetails__portfolioSecuritiesContainer
                          }
                          key={security_id}
                        >
                          <Box
                            className={
                              styles.portfolioDetails__portfolioSecuritiesContainerInner
                            }
                          >
                            <span>{security_id}</span>
                            <span>{weightage_pct}%</span>
                          </Box>

                          <br />
                        </Box>
                      )
                    )}
                  </Box>
                ) : (
                  <Typography
                    component="h4"
                    variant="p"
                    className={styles.portfolioDetails__notAvailableText}
                  >
                    Not Available
                  </Typography>
                )}
              </CardContent>
              <div className={styles.portfolioDetails__Actions}>
                <Link to={`/portfolio/update/${id}`}>
                  <Button
                    variant="filled"
                    className={styles.portfolioDetails__btn}
                    shape="square"
                  >
                    Update
                  </Button>
                </Link>
              </div>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  };
  return <>{renderPortfolioDetails()}</>;
};

export default PortfolioDetails;
