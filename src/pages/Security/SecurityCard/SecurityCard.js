import React from "react";
import { Grid, CardActions, Card, CardContent } from "@mui/material";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/CustomButton";

const SecurityCard = (card, id) => {
  const { security_id, security_name, security_type, exchange_id } = card;
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Card className={styles.securityCard}>
        <CardContent>
          <div className={styles.securityCard__body}>
            <div>
              <span className={styles.securityCard__itemKey}>Security ID:</span>
              <span className={styles.securityCard__itemValue}>
                {security_id || "NA"}
              </span>
            </div>
            <div>
              <span className={styles.securityCard__itemKey}>
                Security Name:
              </span>
              <span className={styles.securityCard__itemValue}>
                {security_name || "NA"}
              </span>
            </div>
            <div>
              <span className={styles.securityCard__itemKey}>
                Security Type:
              </span>
              <span className={styles.securityCard__itemValue}>
                {security_type || "NA"}
              </span>
            </div>
            <div>
              <span className={styles.securityCard__itemKey}>Exchange Id:</span>
              <span className={styles.securityCard__itemValue}>
                {exchange_id || "NA"}
              </span>
            </div>
          </div>
        </CardContent>

        {id && (
          <CardActions className={styles.securityCard__buttonContainer}>
            <Link to={`/security/${security_id}`}>
              <Button
                color="success"
                shape="square"
                className={styles.securityCard__button}
              >
                View
              </Button>
            </Link>
            <Link to={`/security/update/${security_id}`}>
              <Button
                variant="filled"
                shape="square"
                className={styles.securityCard__button}
              >
                Update
              </Button>
            </Link>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

export default SecurityCard;
