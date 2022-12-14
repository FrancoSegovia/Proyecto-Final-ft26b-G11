import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../../../../redux/actions/index.js";
import jwtDecode from "jwt-decode";

import UserCard from "../../features/UserCard/UserCard";
import Navbar from "../../features/UserNavbar/UserNavbar.jsx";
import UserShopOrder from "../../features/UserShopOrder/UserShopOrder.jsx";
import UserShopFilter from "../../features/UserShopFilter/UserShopFilter.jsx";
import ShoppingCart from "../../features/UserShoppingCart/ShoppingCart";
import UserOrders from "../../features/UserOrders/UserOrders";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const error = useSelector((state) => state.error);
  const localS = jwtDecode(localStorage.getItem("token")).type;

  useEffect(() => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("total", JSON.stringify(0));
    }
    dispatch(getAllShops());
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100%",
          minHeight: "100vh",
          marginTop: "75px",
          backgroundColor: "white",
        }}
      >
        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ marginBottom: "20px", padding: "35px 0px" }}
        >
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <UserShopOrder />
            <UserShopFilter />
            {localS === "user" ? <UserOrders /> : null}
          </Grid>

          <Grid
            container
            justifyContent="space-evenly"
            xs={localS === "owner" ? 6 : 7}
            style={{ textAlign: "center" }}
          >
            {error || !shops.length ? (
              <p
                style={{
                  fontSize: "16px",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  color: "#1976d2",
                }}
              >
                No pudimos encontrar el Negocio solicitado.
              </p>
            ) : (
              shops.map((shop) => {
                return (
                  <div key={shop._id}>
                    <UserCard shop={shop} />
                  </div>
                );
              })
            )}
          </Grid>
          {localS === "user" ? (
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "15px",
                }}
              >
                <Avatar style={{ backgroundColor: "#1976d2" }}>
                  <ShoppingCartIcon />
                </Avatar>
              </Box>

              <ShoppingCart />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </>
  );
}
