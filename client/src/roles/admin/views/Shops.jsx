import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import CloseIcon from '@mui/icons-material/Close';  //!  X
import EditIcon from '@mui/icons-material/Edit';    //!  pencil

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from '../features/ListItems';


import AdminCard from '../features/AdminCard';
import image from '../../../media/defaultShop.jpg'

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getAllShops } from '../../../redux/actions';

const negocios = [
  {
    image,
    name:"Ñamfifruli",
    category:"Restaurant",
    products:[
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      },
      {
        image,
        name:"Papafrula",
        price:"500",
      }
    ]
  },
  {
    image,
    name:"Oktubre",
    category:"Heladeria",
    products:[
      {
        image,
        name:"Helado de vainilla",
        price:"500",
      }
    ]
  },
  {
    image,
    name:"Luzbelito",
    category:"Bodegón",
    products:[
      {
        image,
        name:"Milanesa con puré",
        price:"500",
      }
    ]
  },
  {
    image,
    name:"Pizza Conmigo",
    category:"Pizzeria",
    products:[
      {
        image,
        name:"Especial Kito Pizza",
        price:"500",
      }
    ]
  }
  ,
  {
    image,
    name:"El Paseo Familiar de Don José",
    category:"Bodegón",
    products:[
      {
        image,
        name:"Papito jugó al Doom",
        price:"250",
      }
    ]
  }
]


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  const shops = useSelector(state => state.shops);

  console.log(shops)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllShops());
  }, [])
  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Gestión de negocios
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow:3,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display:"flex", flexWrap:"wrap", justifyContent:"space-evenly", rowGap:"50px", gap:"30px"}}>
            {shops.map(negocio => {
              return (
                  <AdminCard 
                    shop={negocio}
                  />
            )})}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}