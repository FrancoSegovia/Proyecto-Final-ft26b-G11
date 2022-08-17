import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../../../redux/actions/index.js";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

import UserCard from "../../user/features/UserCard/UserCard.jsx";
import Navbar from "../../delivery/features/ClickerNavbar/ClickerNavbar";

import { Grid } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getAllShops());
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "75px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ marginBottom: "20px", padding: "35px 0px" }}
        >
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              align="left"
              component="h3"
              color="textPrimary"
            >
              Monedero
            </Typography>
            <Typography
              variant="h4"
              align="left"
              component="h4"
              color="textSecondary"
            >
              $100
            </Typography>
          </Grid>

          <Grid
            item
            justifyContent="space-evenly"
            xs={7}
            style={{ textAlign: "center", backgroundColor: "green" }}
          >
            <Container></Container>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ padding: "35px 0px", backgroundColor: "red" }}
        >
          Juasjuas
        </Grid>
      </div>
    </>
  );
}