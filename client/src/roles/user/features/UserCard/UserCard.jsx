import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultShop from '../../../../media/defaultShop.jpg';
import getQueryProducts from "../../../../redux/actions"

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
} from "@mui/material";
import { Clear, Add, DoNotDisturbOnTotalSilenceTwoTone } from "@mui/icons-material";
import { addShoppingCart } from "../../../../redux/actions";
import { styled, alpha } from "@mui/material/styles";

export default function UserCard({ shop }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.modalProducts)

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // const [products, setProducts] = useState([]);
  const regExp = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  const onCardClick = async () =>  {
    setOpen(true);
    dispatch(getQueryProducts())
    //setProducts();
  };

  const onCardClose = () => {
    setOpen(false);
    // setProducts([]);
  }
  const onButtonClick = (e) => {
    dispatch(addShoppingCart(e.target.value));
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
      borderRadius: "15%",
      marginRight:"25px",
    },
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
    width: 800,
    maxHeight: "calc(100vh - 210px)",
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
                gap:"50px"
              }}
            >
              {products?.map((product) => {
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
                          style={styles.media}
                          image={product.image}
                        />
                        <Typography
                          style={{ marginTop: "18px" }}
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
                        <Button
                          value={product._id}
                          variant="contained"
                          size="small"
                          disableElevation
                          onClick={onButtonClick}
                        >
                          Añadir al Carrito
                        </Button>
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
        sx={{ maxWidth: "30vw", minWidth: "1.5vw", maxHeight:200, minHeight:200,  "&:hover": { cursor: "pointer", outline:"3px solid #4fc3f7"  }, backgroundColor:"whitesmoke", display:"flex", justifyContent:"space-between" }}
        style={{ marginTop: "15px", padding:"25px" }}
      >

          <CardContent style={{ minWidth: 220,marginBottom: "20px",maxWidth: 200, marginLeft:"30px"}} onClick={onCardClick}>
            <Typography variant="h4" color="textPrimary" component="div" align="left">
              {shop.name}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="div"
              style={{ textAlign: "left"}}
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
