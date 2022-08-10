import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { deleteShoppingCart } from "../../../../redux/actions";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const onClick = (e) => {
    dispatch(deleteShoppingCart(e.target.value));
  }

  const styles = {
    media: {
      alignSelf: "center",
      width: "150px",
      borderRadius: "15%",
    },
  };
  return (
    <>
      <Grid>
        <Typography
          id="transition-modal-title"
          style={{ textAlign: "center" }}
          variant="h5"
          component="h5"
        >
          Carrito de Compras
        </Typography>

        <br></br>
        {!cart.length
          ? "NO HAY NADA EN TU CARRITO FLACO"
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
      </Grid>
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
