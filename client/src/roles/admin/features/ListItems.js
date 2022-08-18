import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import StoreIcon from '@mui/icons-material/Store';
import { Logout } from '@mui/icons-material';
import AdminLogout from './AdminLogout';



export const mainListItems = (
  <React.Fragment>

    <Link to="/admin/users" style={{textDecoration:"none", color:"black"}}>
        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon /> 
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>
    </Link>

    <Link to="/admin/owners" style={{textDecoration:"none", color:"black"}}>
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Dueños" />
        </ListItemButton>
    </Link>

    <Link to="/admin/clickers" style={{textDecoration:"none", color:"black"}}>
        <ListItemButton>
          <ListItemIcon>
            <PedalBikeIcon />
          </ListItemIcon>
          <ListItemText primary="Clickers" />
        </ListItemButton>
    </Link>

    <Link to="/admin/shops" style={{textDecoration:"none", color:"black"}}>
        <ListItemButton>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Negocios" />
        </ListItemButton>
    </Link>

    <Link to="/admin/orders" style={{textDecoration:"none", color:"black"}}>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Ordenes" />
        </ListItemButton>
    </Link>

    
      <AdminLogout/>
    

    {/* <Link>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Compras" />
        </ListItemButton>
    </Link> */}


  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );