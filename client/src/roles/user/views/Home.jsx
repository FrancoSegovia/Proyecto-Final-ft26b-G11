import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Link } from 'react-router-dom';

import { getAllLocals } from "../../../redux/actions/index.js";
import UserCard from "../features/UserCards/UserCard";
import UserFilter from "../features/UserFilter/UserFilter";
import UserOrder from "../features/UserOrder/UserOrder";
import Navbar from '../features/UserNavbar/UserNavbar.jsx';


function Home() {
    const dispatch = useDispatch();
    const locals = useSelector(state => state.locals);
    const error = useSelector(state => state.error);
    // console.log(products);


    useEffect(() => {
      dispatch(getAllLocals());
    }, [])
    

  return (
    <>
    <Navbar/>
    <div style={{ marginTop: "8px", backgroundColor:"white"}}>
      <Grid
        container
        justifyContent="center"
        direction="row"
        rowSpacing={1}
        style={{ marginBottom: "50px", padding: "35px 0px" }}
      >
        <Grid
          item
          xs={2}
          style={{ textAlign: "center" }}
        >
          {/* <UserOrder />

          <UserFilter /> */}            [//! LO COMENTEVICH]
        </Grid>

        <Grid
          container
          justifyContent="space-evenly"
          xs={7}
          style={{ textAlign: "center" }}
        > 
          {error || !locals.length ? <div>No pudimos encontrar productos relacionados :(</div> : locals.map(local => {
            return <UserCard local={local}/>;
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
    </>
  );
}

export default Home;
