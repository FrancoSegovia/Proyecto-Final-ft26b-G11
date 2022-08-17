import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../../redux/actions";
import jwtDecode from "jwt-decode";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddBusiness, Logout, Person, PersonAdd, Settings } from "@mui/icons-material";


export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const localS = jwtDecode(localStorage.getItem("token")).type
  // console.log(JSON.parse(localS))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Mi cuenta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#b3e5fc",
                color: "#1976d2",
              }}
            >
              <Person />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        
        {localS !== "user" 
        ? <>
          <MenuItem onClick={() => {navigate("/owner/settings")}}>
            <ListItemIcon>
              <Settings style={{ color:"#1976d2"}} /> 
            </ListItemIcon>
            Gestionar mis negocios
          </MenuItem>

          <MenuItem onClick={() => {navigate("/owner/create")}}>
            <ListItemIcon>
            <AddBusiness style={{ color:"#1976d2"}} /> 
            </ListItemIcon>
            Agregar un nuevo negocio
          </MenuItem>
          <Divider />
          </>
        :
          <>
          
          <MenuItem onClick={() => {navigate("/user/profile")}}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Opciones de cuenta
          </MenuItem>
          </>
      }
        
        <MenuItem onClick={onLogoutClick} >
          <ListItemIcon style={{ color:"#1976d2"}}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
