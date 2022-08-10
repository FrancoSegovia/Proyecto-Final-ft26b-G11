import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getQueryShops,
  getAllShops,
  errorCleaner,
} from "../../../../redux/actions";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";


export default function Navbar() {

  // const StyledInputBase = styled(InputBase)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" >
          <Toolbar style={{display:"flex", justifyContent:"center"}}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              
            >
              Click!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
