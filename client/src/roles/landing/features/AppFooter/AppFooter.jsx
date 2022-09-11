import React from "react";

import Typography from "../Typography/Typography.jsx";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const linksStyle = {
  textDecoration: "none",
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
              <a
                href="https://github.com/FrancoSegovia/Proyecto-Final-ft26b-G11"
                target="_blank"
                rel="noopener noreferrer"
                style={linksStyle}
              >
                Repositorio en Github
              </a>
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
            {/* {isClicked === true ? <LinkList/> : null} */}
            <Typography variant="h6" gutterBottom noWrap>
              <Link
                // onClick={onLinkClick}
                to="/profiles"
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
