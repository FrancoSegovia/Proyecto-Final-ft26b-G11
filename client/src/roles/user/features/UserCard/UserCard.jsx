import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {getQueryProducts} from "../../../../redux/actions"
import defaultShop from "../../../../media/defaultShop.jpg";
import axios from "axios";


import ShoppingCart from "../UserShoppingCart/ShoppingCart";

import { addShoppingCart } from "../../../../redux/actions";


import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
  CardActions,
   InputBase,
  Box,
  Fade,
  Modal,
  Grid,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
  

import { Clear, Add } from "@mui/icons-material";

export default function UserCard({ shop }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector(state => state.modalProducts)

  const [search, setSearch] = useState("");
  const regExp = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  const [open, setOpen] = useState(false);
  

  let localS = localStorage.getItem("type");


  const onCardClick = async () => {
    setOpen(true);
    dispatch(getQueryProducts())
    //setProducts();
  };

  const onCardClose = () => {
    setOpen(false);
    // setTimeout(() => {
    //   setProducts([]);
    // }, 1000);
  }
  const onButtonClick = (product) => {
    dispatch(addShoppingCart(product));
  };
  
  const onChange = async (e) => {
    e.prevent.default();
    setSearch(e.target.value);
    if (!regExp.test(e.target.value) && e.target.value !== "") {
    return;
    }
    //agregar cartel "caracteres inválidos"?
    if(search.length > 1){
    dispatch(getQueryProducts(search.trim()))
    // setProducts()
    }else{
    dispatch(getQueryProducts())
      //setProducts(dispatch(getProducts()))
    }
  }


  console.log(shop);
  
  const styles = {
    media: {
      alignSelf: "center",
      width: "150px",
      maxHeight:"110px",
      borderRadius: "15%",
      marginRight:"25px",
      objectFit:"cover"

    },
    modalMedia: {
      alignSelf: "center",
      width: "150px",
      minHeight:"110px",
      maxHeight:"110px",
      borderRadius: "15%",
      objectFit:"cover"
    }
  };

  const closeButtonStyle = {
    alignSelf: "flex-end",
    transition: "0.25s",
  };

  const modalStyle = {
    outline: "none",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    maxHeight: "calc(100vh - 100px)",
    overflow: "hidden",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };


  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  // const StyledInputBase = styled(InputBase)

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      // transition: theme.transitions.create("width"),
    },
    width: "270px",
    height: "40px !important",
  }));



  // <Search>
  //   <SearchIconWrapper>
  //     <Search />
  //   </SearchIconWrapper>
  //     <StyledInputBase
  //     placeholder="Buscar Productos"
  //     inputProps={{ "aria-label": "search" }}
  //     name="search"
  //     type="string"
  //     value={search}
  //     onChange={onChange}
  //     autoFocus
  //     />
  // </Search>



  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onCardClose}
        closeAfterTransition
        style={{backdropFilter:"blur(3px)", transition:"0"}}

      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <IconButton
              sx={{ "&:hover": { backgroundColor: "#e8e8e8" } }}
              style={closeButtonStyle}
              onClick={() => setOpen(false)}
            >
              <Clear />
            </IconButton>

            <Typography
              id="transition-modal-title"
              style={{ textAlign: "center" }}
              variant="h3"
              component="h3"
            >
              {shop.name}
            </Typography>

            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h5"
              style={{
                margin: "20px",
                textAlign: "center",
                wordWrap: "break-word",
              }}
            >
              {shop.description?.length
                ? shop.description
                : "Este negocio no cuenta con una descripción."}
            </Typography>

            <Typography
              id="transition-modal-title"
              style={{
                marginTop: "15px",
                textAlign: "center",
                marginBottom: "15px",
              }}
              variant="h5"
              component="h5"
              color="textSecondary"
            >
              {products?.length
                ? `Menú de ${shop.name}`
                : "Este negocio aún no cuenta con productos."}
            </Typography>

            <Container
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                marginBottom: "20px",
                marginTop: "20px",
                "&hover": { cursor: "default" },
                gap:"20px",
              }}
            >
              {/* {products?.map((product) => {
                return (
                  <div key={product._id} >
                    <Card
                      style={{
                        backgroundColor: "whitesmoke",
                        padding: "50px",
                        minWidth:"250px",
                        maxWidth: "250px",
                        minHeight:(localS !== "owner" ? "40vh" : "20vh"),
                        maxHeight:"40vh"
                      }}
                    >
                      <CardContent
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent:"center",
                          padding: "10px",
                        }}
                      >
                        <CardMedia
                          component="img"
                          style={styles.modalMedia}
                          image={product.image}
                        />
                        <Typography
                          style={{ marginTop: "18px" }}
                          variant="h5"
                          color="textPrimary"
                          component="div"
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="h4"
                          color="textPrimary"
                          component="div"
                        >
                          {"$" + product.price}
                        </Typography>


                        { localS !== "owner" ?
                          <Button
 
                          variant="contained"
                          size="small"
                          disableElevation
                          disabled={cart.find((c) => c.name === product.name)}
                          onClick={() => onButtonClick(product)}
                        >
                          Añadir al Carrito
                        </Button>
                        :
                          null
                      }

                       
                      </CardContent>
                    </Card>
                  </div>
                );
              })} */}
       
            </Container>
          </Box>
        </Fade>
      </Modal>

      <Card
        sx={{
          maxWidth: "30vw",
          minWidth: "1.5vw",
          maxHeight: 200,
          minHeight: 200,
          "&:hover": { cursor: "pointer", outline: "3px solid #4fc3f7" },
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "space-between",
        }}
        style={{ marginTop: "15px", padding: "25px" }}
        onClick={onCardClick}
      >
        <CardContent
          style={{
            minWidth: 220,
            marginBottom: "20px",
            maxWidth: 200,
            marginLeft: "30px",
          }}
          
        >
          <Typography
            variant="h4"
            color="textPrimary"
            component="div"
            align="left"
          >
            {shop.name}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            component="div"
            style={{ textAlign: "left" }}
          >
            {shop.category}
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          style={styles.media}
          image={shop.image ? shop.image : defaultShop}
          onClick={onCardClick}
        />
      </Card>
    </div>
  );
}
