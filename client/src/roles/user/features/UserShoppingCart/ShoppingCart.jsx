import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { deleteShoppingCart, getShoppingCart } from "../../../../redux/actions";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  useEffect(() =>{
    dispatch(getShoppingCart())
  },[])

  const onClick = (e) => {
    e.preventDefault()
    dispatch(deleteShoppingCart(e.target.value));
  };

  const onBuyClick = (e) => {
    e.preventDefault()
    navigate("/*");
  };

  const styles = {
    media: {
      alignSelf: "center",
      width: "150px",
      borderRadius: "15%",
    },
  };
  return (
    <>
      <Stack
      >
        <Typography
          id="transition-modal-title"
          style={{ textAlign: "center" }}
          variant="h5"
        >
          Carrito de Compras
        </Typography>
        <br></br>
        {!cart.length
          ? "El Carrito se encuentra Vacio"
          : cart.map((p) => {
              return (
                <div>
                  <i>{p}</i>
                  <Button
                    value={p}
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={onClick}
                  >
                    x
                  </Button>
                </div>
              );
            })}
        <br></br>
        <Button
          variant="contained"
          size="medium"
          disableElevation
          disabled={!cart.length}
          onClick={onBuyClick}
        >
          Comprar
        </Button>
      </Stack>
    </>
  );
}

{
  /* return (
  <Card
    style={{
      margin: "15px 0px",
      backgroundColor: "whitesmoke",
      padding: "20px",
      maxWidth: "200px",
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
        image={p.image}
      />

      <Typography
        style={{ marginTop: "18px" }}
        variant="h4"
        color="textPrimary"
        component="div"
      >
        {p.name}
      </Typography>
      <Typography
        variant="h4"
        color="textPrimary"
        component="div"
      >
        {"$" + p.price}
      </Typography>
    </CardContent>
  </Card>
); */
}
