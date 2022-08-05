import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { getAllProducts } from "../../../redux/actions/index.js";
import UserCard from "../features/UserCards/UserCard";
import UserFilter from "../features/UserFilter/UserFilter";
import UserOrder from "../features/UserOrder/UserOrder";


function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    // console.log(products);

    useEffect(() => {
      dispatch(getAllProducts());
    }, [])
    

  return (
    <div style={{ marginTop: "100px" }}>
      <Grid
        container
        justifyContent="center"
        direction="row"
        rowSpacing={1}
        style={{ marginBottom: "50px" }}
      >
        <Grid
          item
          xs={2}
          style={{ textAlign: "center" }}
        >
          <UserOrder />

          <UserFilter />
        </Grid>

        <Grid
          container
          justifyContent="space-evenly"
          xs={7}
          style={{ textAlign: "center" }}
        >
          {products.map(product => {
            return <UserCard product={product} />;
          })}
        </Grid>

        <Grid
          item
          xs={2}
          style={{ textAlign: "center" }}
        >
          <item>ACÁ VA EL COMPONENTE DE CARRITO</item>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
