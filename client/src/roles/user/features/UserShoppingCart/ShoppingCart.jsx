import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
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

  useEffect(() => {
    dispatch(getShoppingCart());
  }, []);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteShoppingCart(e.target.value));
  };

  const onBuy = (e) => {
    e.preventDefault();
    navigate("/user/pay");
  };

  // const onSubstract = () => {};

  // const onAdd = () => {};

  const total = () => {
    let total = 0;
    cart.map((p) => (total = total + p.price));
    localStorage.setItem("total", JSON.stringify(total));
    return total;
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
      <Stack>
        <Typography
          id="transition-modal-title"
          style={{ textAlign: "center" }}
          variant="h5"
        >
          Carrito de Compras
        </Typography>
        <br></br>
        {!cart.length
          ? "Aún no hay nada en el carrito..."
          : cart.map((p) => {
              return (
                <div>
                  <i>{p.name}</i>
                  <Box>
                    {/* <Button
                      value={p._id}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={onSubstract}
                    >
                      -
                    </Button>
                    <Button
                      value={p._id}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={onAdd}
                    >
                      +
                    </Button> */}
                    <Button
                      value={p._id}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={onDelete}
                    >
                      x
                    </Button>
                  </Box>
                </div>
              );
            })}
        <br></br>
        <Typography
          style={{ marginTop: "18px" }}
          variant="h5"
          color="textPrimary"
          component="div"
        >
          {!cart.length ? "Total = 0$" : `Total = ${total()}$`}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          disableElevation
          disabled={!cart.length}
          onClick={onBuy}
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
