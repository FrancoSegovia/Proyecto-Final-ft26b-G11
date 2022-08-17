import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Box,
  Fade,
  Modal,
  Grid,
} from "@mui/material";
import { Clear, Add } from "@mui/icons-material";

export default function UserCard({ shop }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  let localS = localStorage.getItem("type");

  const onCardClick = async () => {
    setOpen(true);
    const products = await axios.get(`http://localhost:3001/account/user/local/products/${shop._id}`);
    setProducts(products.data);
  };

  const onCardClose = () => {
    setOpen(false);

    setTimeout(() => {
      setProducts([]);
    }, 1000);
    
  }
  const onButtonClick = (e) => {
    dispatch(addShoppingCart(e.target.value));
  };


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
              {products?.map((product) => {
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
                         null
                          // <Button
                          //   value={product._id}
                          //   variant="contained"
                          //   size="medium"
                          //   disableElevation
                          //   onClick={onButtonClick}
                          //   style={{marginTop:"30px"}}
                          // >
                          //   Añadir al Carrito
                          // </Button> 
                        :
                          null
                      }

                       
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
       
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
      >
        <CardContent
          style={{
            minWidth: 220,
            marginBottom: "20px",
            maxWidth: 200,
            marginLeft: "30px",
          }}
          onClick={onCardClick}
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
