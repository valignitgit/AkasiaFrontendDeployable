import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

import styles from "./style.module.scss";

const CountryCard = ({ country_id, country_name, handleDelete }) => {
  const navigate = useNavigate();
  const handleViewCountry = () => {
    navigate(`/country/${country_id}`);
  };

  const renderCountryCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={styles.countryCard}>
            <CardContent>
              <Box className={styles.countryCard__containWrapper}>
                <span className={styles.countryCard__itemKey}>Country Id:</span>
                <span className={styles.countryCard__itemValue}>
                  {country_id}
                </span>
              </Box>
              <br />
              <Box className={styles.countryCard__containWrapper}>
                <span className={styles.countryCard__itemKey}>
                  Country Name:
                </span>
                <span className={styles.countryCard__itemValue}>
                  {country_name || "Not Available"}
                </span>
              </Box>
              <br />
            </CardContent>
            <div className={styles.countryCard__Actions}>
              <Link to={`/country/${country_id}`}>
                <Button
                  className={styles.countryCard__btn}
                  shape="square"
                  onClick={handleViewCountry}
                >
                  View
                </Button>
              </Link>

              <Link to={`/country/update/${country_id}`}>
                <Button
                  className={styles.countryCard__btn}
                  shape="square"
                  onClick={handleViewCountry}
                >
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className={styles.countryCard__btn}
                onClick={() => handleDelete(country_id, country_name)}
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

  return <>{renderCountryCard()}</>;
};

export default CountryCard;
