import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddBusiness } from "@mui/icons-material";


export default function Navbar() {

  // const StyledInputBase = styled(InputBase)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" >
          <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              Click!
            </Typography>
            <Link to="/SignIn" style={{textDecoration:"none"}}>
              <Button variant="contained" color="primary" size="small" style={{justifySelf:"flex-end"}}>
                  Cerrar Sesión
                  <IconButton style={{ color: "white" }}>
                    <PersonIcon/>
                  </IconButton>
              </Button>
            </Link>
          </Toolbar>
          
        </AppBar>
      </Box>
    </div>
  );
}