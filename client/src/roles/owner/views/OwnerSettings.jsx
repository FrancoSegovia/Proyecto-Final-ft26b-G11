import { ArrowBack, Edit } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getOwnerDetails, getOwnerShops } from '../../../redux/actions';
import AdminCard from '../../admin/features/AdminCard';
import { Home } from '@mui/icons-material';

function OwnerSettings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ownerShops = useSelector(state => state.ownerShops);
    const data = jwtDecode(localStorage.getItem("token"));

    
    useEffect(() => {
        dispatch(getOwnerShops(data._id));
    }, [ownerShops])
    
    console.log(ownerShops);
    
  return (
    <>
        <Box style={{ display:"flex", flexDirection:"column",alignItems:"center", minWidth:"100vw", minHeight:"100vh", justifyContent:"center"}} >
          <Typography variant="h4" color="primary.main" sx={{ display:"block", fontFamily:"roboto"}}>GESTIONAR NEGOCIOS</Typography>
            <Box style={{ padding:"20px", maxWidth:"68vw",display:"flex", flexDirection:"row", gap:"25px", flexWrap:"wrap", justifyContent:"space-between"}}>
                {ownerShops.map(shop => {
                  return (

                    <>
                    <AdminCard shop={shop}/>
        
                    </>
                  )
                })}
            </Box>
                <Link to="/owner/home" style={{ textDecoration: "none", color: "white", padding:"20px"}}>
                  <Button variant="contained" startIcon={<ArrowBack />} endIcon={<Home/>}>
                    Regresar
                  </Button>
                </Link>
        </Box>

        
    </>
  )
}

export default OwnerSettings