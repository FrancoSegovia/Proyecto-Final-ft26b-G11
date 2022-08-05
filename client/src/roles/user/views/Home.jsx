import React from 'react'
import { Grid } from '@mui/material';
import json from '../../../utils/foods.js';
import UserCard from '../features/UserCards/UserCard';
import { useSelector } from 'react-redux';

function Home() {
  return (
    <div style={{marginTop:"100px"}}>
            <Grid container justifyContent="center" direction="row" rowSpacing={1} style={{marginBottom:"50px"}}>

                <Grid item xs={2} style={{backgroundColor:"red", textAlign:"center"}}>
                    <item>ACÁ VA EL COMPONENTE DE FILTROS/ORDENAMIENTOS</item>
                </Grid>

                <Grid container justifyContent="space-evenly" xs={7} style={{backgroundColor:"White", textAlign:"center"}}>
                    {json?.foods.map(food => {
                        return <UserCard food={food}/>
                    })}
                </Grid>

                <Grid item xs={2} style={{backgroundColor:"Red", textAlign:"center"}}>
                    <item>ACÁ VA EL COMPONENTE DE CARRITO</item>
                </Grid>

            </Grid>
    </div>
  )
}

export default Home