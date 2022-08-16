import { ArrowBack, Edit } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getOwnerDetails, getOwnerShops } from '../../../redux/actions';
import AdminCard from '../../admin/features/AdminCard';

function OwnerSettings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ownerShops = useSelector(state => state.ownerShops);
    const data = jwtDecode(localStorage.getItem("token"));

    console.log(data)
    
    useEffect(() => {
        dispatch(getOwnerShops(data._id));
    }, [])
    
    console.log(ownerShops);
    
  return (
    <>
        <Box style={{display:"flex", flexDirection:"column",alignItems:"center", minWidth:"100vw", minHeight:"100vh", justifyContent:"center", rowGap:"30px"}} >
            <Box style={{display:"flex", flexDirection:"row", gap:"50px"}}>
                {ownerShops.map(shop => {
                  return (

                    <>
                    <AdminCard shop={shop}/>
        
                    </>
                  )
                })}
            </Box>
                <Link to="/owner/home" style={{ textDecoration: "none", color: "white"}}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
                </Link>
        </Box>

        
    </>
  )
}

export default OwnerSettings