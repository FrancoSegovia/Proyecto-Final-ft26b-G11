import { Logout } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { signOut } from '../../../redux/actions';

function AdminLogout() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogoutClick = () => {
        dispatch(signOut());
        navigate("/");
    };

  return (
    <ListItemButton onClick={onLogoutClick}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
    </ListItemButton>
  )
}

export default AdminLogout