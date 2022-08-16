import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { signOut } from "../../../../redux/actions";


export default function Navbar() {

  // const StyledInputBase = styled(InputBase)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(signOut());
    navigate("/");
  }

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
              <Button variant="contained" color="primary" size="small" style={{justifySelf:"flex-end"}} onClick={onLogoutClick}>
                  Cerrar Sesión
                  <IconButton style={{ color: "white" }}>
                    <PersonIcon/>
                  </IconButton>
              </Button>
          </Toolbar>
          
        </AppBar>
      </Box>
    </div>
  );
}
