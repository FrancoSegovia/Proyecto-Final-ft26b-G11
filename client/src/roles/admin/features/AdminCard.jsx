import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultShop from "../../../media/defaultShop.jpg";
import defaultProduct from "../../../media/defaultProduct.png";
import axios from "axios";
import jwtDecode from "jwt-decode";

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
  Grid
} from "@mui/material";
import { Clear, Add } from "@mui/icons-material";
import { addShoppingCart, deleteShop } from "../../../redux/actions";

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit'; 
import { deleteProduct } from "../../../redux/actions";

export default function AdminCard({ shop }) {

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const data = jwtDecode(localStorage.getItem("token"));

  console.log(shop._id);

  const onRemoveClick = () => {
    dispatch(deleteShop(shop._id));
  }

  const onCardClose = (e) => setOpen(false);
  const onCardClick = async () =>  {
    setOpen(true);
    const products = await axios.get(`http://localhost:3001/account/user/local/products/${shop._id}`);
    setProducts(products.data);
  };

  const styles = {
    media: {
      alignSelf: "center",
      width: "150px",
      borderRadius: "15%",
      marginRight:"2vw",
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

  const closeBtnStyle = {
    width:"32vw",
    position:"sticky",
    backgroundColor:"#f44336",
    color:"white",
    "&:hover":{
      backgroundColor:"#d32f2f"
    }
  }

  const editBtnStyle = {
    width:"32vw",
    position:"sticky",
    backgroundColor:"#29b6f6",
    color:"white",
    '&:hover':{
      backgroundColor:"#2293c7"
    }
  }

  const closeModalBtnStyle = {
    position:"absolute",
    translate:"120px -35px",
    backgroundColor:"#f44336",
    color:"white",
    "&:hover":{
      backgroundColor:"#d32f2f"
    },
  }

  const editModalBtnStyle = {
    position:"absolute",
    translate:"-120px -35px",
    backgroundColor:"#29b6f6",
    color:"white",
    '&:hover':{
      backgroundColor:"#2293c7"
    }
  }

  const closeButtonStyle = {
    alignSelf: "flex-end",
    transition: "0.25s",
    position:"absolute",
    float:"right"
  };

  const modalStyle = {
    outline: "none",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1300,
    maxHeight: data.type !== "owner" ? "calc(100vh - 10px)" : "calc(100vh - 100px)",
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
        style={{backdropFilter:"blur(2px)", transition:"0"}}
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
              style={{ marginTop: "15px", textAlign: "center", marginBottom:"15px" }}
              variant="h5"
              component="h5"
              color="textSecondary"
            >
              {products.length
                ? `Menú de "${shop.name}"`
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
                gap:"50px"
              }}
            >
              {products.map((product) => {
                return (
                  <div key={product._id}>
                    <Card
                      style={{
                        backgroundColor: "whitesmoke",
                        padding: "20px",
                        minWidth:"250px",
                        maxWidth: "250px",
                      }}
                    >
                      <CardContent
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          alignItems: "center",
                          padding: "10px",
                        }}
                      >
                        <CardMedia
                          component="img"
                          style={styles.modalMedia}
                          image={product.image ? product.image : defaultProduct}
                        />
                        <Typography
                          style={{ marginTop: "18px", fontSize:"1vw" }}
                          variant="h4"
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

                        <IconButton sx={closeModalBtnStyle} onClick={() => {dispatch(deleteProduct(product._id)) }}>
                            <CloseIcon/>
                        </IconButton>

                        {/* {data.type === "owner" ?
                          <IconButton sx={editModalBtnStyle}>
                            <EditIcon/>
                          </IconButton>

                        :
                        <>
                          <IconButton sx={closeModalBtnStyle}>
                            <CloseIcon/>
                          </IconButton>
                          <IconButton sx={editModalBtnStyle}>
                            <EditIcon/>
                          </IconButton>
                          </>
                        } */}
                         

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
        sx={{ maxWidth: "32vw", minWidth: "1.5vw", maxHeight:200, minHeight:200,  "&:hover": { cursor: "pointer", outline:"3px solid #4fc3f7"  }, backgroundColor:"whitesmoke", display:"flex", justifyContent:"space-between" }}
        style={{ marginTop: "15px" }}
      >
          
        <CardContent style={{ minWidth: 300, marginTop: "20px",marginBottom: "20px",maxWidth: 200, marginLeft:"30px"}} onClick={onCardClick}>
          <Typography wrap variant="h4" color="textPrimary" component="div" style={{ fontSize:"2vw"}}>
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

      <Box style={{ position:"sticky", display:"flex", flexDirection:"column", gap:"5px", marginTop:"7px"}}>

            {data.type === "owner" ? 
            <>
            {/* <Button sx={editBtnStyle}>
                <EditIcon/>
            </Button> */}
            <Button sx={closeBtnStyle} onClick={onRemoveClick}>
              <CloseIcon/>
            </Button>
            </>
             :
                <Button sx={closeBtnStyle} onClick={onRemoveClick}>
                    <CloseIcon/>
                </Button>
             }
            
            
      </Box>

    </div>
  );
}
