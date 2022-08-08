import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";


import { getAllShops } from "../../../redux/actions/index.js";

import UserCard from "../features/UserCards/UserCard";
import Navbar from "../features/UserNavbar/UserNavbar.jsx";
import UserShopOrder from "../features/UserShopOrder/UserShopOrder.jsx";
import UserShopFilter from "../features/UserShopFilter/UserShopFilter.jsx";

function Home() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const error = useSelector((state) => state.error);


  useEffect(() => {
    dispatch(getAllShops());
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "8px", backgroundColor: "white" }}>
        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ marginBottom: "50px", padding: "35px 0px" }}
        >
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <UserShopOrder />
            <UserShopFilter />
          </Grid>

          <Grid
            container
            justifyContent="space-evenly"
            xs={7}
            style={{ textAlign: "center" }}
          >
            {error || !shops.length ? (
              <p style={{fontSize:"16px", fontFamily:"Roboto", fontWeight:"bold", color:"#1976d2"}}>No pudimos encontrar el Negocio solicitado.</p>
            ) : (
              shops.map((shop) => {
                return <UserCard shop={shop} />;
              })
            )}
          </Grid>

          <Grid item xs={2} style={{ textAlign: "center" }}>
            {/* <item>ACÁ VA EL COMPONENTE DE CARRITO</item> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
