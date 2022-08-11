import React from "react";

import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "../Typography/Typography";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

export default function LandingValues() {
  return (
    <>
      <Box
        component="section"
        sx={{ display: "flex", overflow: "hidden", bgcolor: "#1976d2" }}
      >
        <Container
          sx={{ mt: 20, mb: 15, display: "flex"}}
        >
          <Grid container spacing={5} style={{backgroundColor:"#b3e5fc", borderRadius:"25px"}}>
            <Grid item xs={12} md={4} >
              <Box sx={item}>
                <Typography variant="h6" sx={{ my: 5 }}>
                  The best luxury hotels
                </Typography>
                <Typography variant="h5" style={{padding:"0px 5px 50px 5px"}}>
                  {
                    "From the latest trendy boutique hotel to the iconic palace with XXL pool"
                  }

                  {
                    ", go for a mini-vacation just a few subway stops away from your home."
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Typography variant="h6" sx={{ my: 5 }}>
                  New experiences
                </Typography>
                <Typography variant="h5" style={{padding:"0px 5px 50px 5px"}}>
                  {
                    "Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… "
                  }

                  {"your Sundays will not be alike."}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Typography variant="h6" sx={{ my: 5 }}>
                  Exclusive rates
                </Typography>
                <Typography variant="h5" style={{padding:"0px 5px 50px 5px"}}>
                  {
                    "By registering, you will access specially negotiated rates "
                  }
                  {"that you will not find anywhere else."}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
