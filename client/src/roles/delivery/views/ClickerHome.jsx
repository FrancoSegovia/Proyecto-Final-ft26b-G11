import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllShops } from "../../../redux/actions/index.js";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

import UserCard from "../../user/features/UserCard/UserCard.jsx";

import OrdersSlider from "../../delivery/features/OrdersSlider/OrdersSlider.jsx"
import Navbar from "../../delivery/features/ClickerNavbar/ClickerNavbar";

import { Grid } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const error = useSelector((state) => state.error);
  const orders = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getAllShops());
  }, []);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [orders]);

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

          <Grid
            item
            xs={5}
            style={{ textAlign: "center" }}
          >
            <OrdersSlider orders={orders}/>
          </Grid>
        </Grid>

      </div>
    </>
  );
}