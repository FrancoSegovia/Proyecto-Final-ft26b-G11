import React from "react";

import Typography from "../Typography/Typography.jsx";
import { Box, Container, Grid, Link } from "@mui/material";

const linksStyle = {
  color: "#b3e5fc",
  fontSize: "15px",
  fontWeight: "200",
  cursor: "pointer",
};

export default function AppFooter() {
  return (
    <Typography component="footer" sx={{ display: "flex", bgcolor: "#1976d2" }}>
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={3} sm={3} md={3}>
            <Typography
              variant="h6"
              marked="left"
              gutterBottom
              style={{ color: "#b3e5fc" }}
            >
              Github
            </Typography>
            <Typography variant="h6" gutterBottom noWrap>
              <Link to="#" style={linksStyle}>
                Repositorio en Github
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={2.5}>
            <Typography
              variant="h6"
              marked="left"
              gutterBottom
              noWrap
              style={{ color: "#b3e5fc" }}
            >
              Información adicional
            </Typography>
            <Typography variant="h6" gutterBottom noWrap>
              <Link
                to="#"
                style={linksStyle}
                sx={{ "&:hover": { color: "black" } }}
              >
                Sobre nosotros
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
