import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Grid
      container
      sx={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Grid item md={4} />

      <Grid item md={4}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Grid>
      <Grid item md={4} />
    </Grid>
  );
};

export default Loader;
