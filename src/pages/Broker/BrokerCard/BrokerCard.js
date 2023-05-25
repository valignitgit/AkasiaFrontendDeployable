import React from "react";
import { Grid, Box, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Button from "../../../components/Button/CustomButton";

const BrokerCard = ({ broker_id, broker_name, handleDelete }) => {
  const renderBrokerCard = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={styles.brokerCard}>
            <CardContent>
              <Box className={styles.brokerCard__containWrapper}>
                <span className={styles.brokerCard__itemKey}>Broker Id:</span>
                <span className={styles.brokerCard__itemValue}>
                  {broker_id}
                </span>
              </Box>
              <br />
              <Box className={styles.brokerCard__containWrapper}>
                <span className={styles.brokerCard__itemKey}>Broker Name:</span>
                <span className={styles.brokerCard__itemValue}>
                  {broker_name || "Not Available"}
                </span>
              </Box>
            </CardContent>
            <div className={styles.brokerCard__Actions}>
              <Link to={`/broker/${broker_id}`}>
                <Button className={styles.brokerCard__btn} shape="square">
                  View
                </Button>
              </Link>
              <Link to={`/broker/update/${broker_id}`}>
                <Button className={styles.brokerCard__btn} shape="square">
                  Edit
                </Button>
              </Link>

              <Button
                shape="square"
                className={styles.brokerCard__btn}
                onClick={() => handleDelete(broker_id)}
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
