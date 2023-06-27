import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid } from "@mui/material";

import Button from "components/Button/CustomButton";

import styles from "./style.module.scss";

const OmniBusAccountCard = ({
  omnibusAccountId,
  bankAccountNum,
  bankAccountName,
  handleDelete,
}) => {
  const renderOmniBusAccountCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={styles.omniBusAccountCard}>
            <CardContent>
              <Box className={styles.omniBusAccountCard__containWrapper}>
                <span className={styles.omniBusAccountCard__itemKey}>
                  OmniBus Account ID:
                </span>
                <span className={styles.omniBusAccountCard__itemValue}>
                  {omnibusAccountId}
                </span>
              </Box>
              <br />
              <Box className={styles.omniBusAccountCard__containWrapper}>
                <span className={styles.omniBusAccountCard__itemKey}>
                  Bank Account Number:
                </span>
                <span className={styles.omniBusAccountCard__itemValue}>
                  {bankAccountNum}
                </span>
              </Box>
              <br />
            </CardContent>
            <div className={styles.omniBusAccountCard__Actions}>
              <Link to={`/omnibus-account/${omnibusAccountId}`}>
                <Button
                  className={styles.omniBusAccountCard__btn}
                  shape="square"
                >
                  View
                </Button>
              </Link>
              <Link to={`/omnibus-account/update/${omnibusAccountId}`}>
                <Button
                  className={styles.omniBusAccountCard__btn}
                  shape="square"
                >
                  Edit
                </Button>
              </Link>
              <Button
                shape="square"
                className={styles.omniBusAccountCard__btn}
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
