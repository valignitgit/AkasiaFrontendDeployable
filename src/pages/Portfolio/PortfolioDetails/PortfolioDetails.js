import React, { useEffect } from "react";
import { Grid, Card, CardContent } from "@mui/material";
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
          className={styles.portfolioDetails__container}
        >
          <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
            <h1 className={styles.portfolioDetails__heading}>
              Portfolio Details
            </h1>
            <Card className={styles.portfolioDetails}>
              <CardContent>
                <div className={styles.portfolioDetails__body}>
                  <div>
                    <span className={styles.portfolioDetails__itemKey}>
                      Portfolio Name:
                    </span>
                    <span className={styles.portfolioDetails__itemValue}>
                      {portfolio_name || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.portfolioDetails__itemKey}>
                      Portfolio Name Arabic:
                    </span>
                    <span
                      className={`${
                        portfolio_name_ar
                          ? `${styles.portfolioDetails__itemValue} ${styles.portfolioDetails__textArabic} text_right`
                          : ""
                      }`}
                    >
                      {portfolio_name_ar || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.portfolioDetails__itemKey}>
                      Risk Level:
                    </span>
                    <span className={styles.portfolioDetails__itemValue}>
                      {risk_level || "NA"}
                    </span>
                  </div>
                  <div>
                    <span className={styles.portfolioDetails__itemKey}>
                      Avarage Growth Pecentage:
                    </span>
                    <span>{avg_growth_pct || "NA"}%</span>
                  </div>
                  <span className={styles.portfolioDetails__itemKey}>
                    Securities
                  </span>
                </div>
                {portfolioSecurities?.length > 0 ? (
                  <div className={styles.portfolioDetails__containWrapper}>
                    {portfolioSecurities?.map(
                      ({ security_id, weightage_pct }) => (
                        <div
                          className={
                            styles.portfolioDetails__portfolioSecuritiesContainer
                          }
                          key={security_id}
                        >
                          <div
                            className={
                              styles.portfolioDetails__portfolioSecuritiesContainerInner
                            }
                          >
                            <span>{security_id}</span>
                            <span>{weightage_pct}%</span>
                          </div>

                          <br />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className={styles.portfolioDetails__notAvailableText}>
                    Not Available
                  </p>
                )}
              </CardContent>
              <div className="buttons_container">
                <Link to="/portfolio">
                  <Button
                    variant="filled"
                    className={styles.portfolioDetails__btn}
                    shape="square"
                  >
                    Cancel
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
