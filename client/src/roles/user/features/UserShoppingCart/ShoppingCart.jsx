import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  amountShoppingCart,
  deleteShoppingCart,
  getShoppingCart,
  clearShoppingCart,
} from "../../../../redux/actions";

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

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  const onAmount = (id, amount) => {
    dispatch(amountShoppingCart(id, amount))
  }

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteShoppingCart(e.target.value));
  };

  const onBuy = (e) => {
    e.preventDefault();
    navigate("/user/pay");
  };

  const onClear = (e) => {
    e.preventDefault();
    dispatch(clearShoppingCart());
  }

  const total = () => {
    let total = 0;
    cart.map((p) => (total = total + p.price * p.amount));
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
                  <Typography variant="subtitle1">{p.name}</Typography>
                  <Typography variant="subtitle1">{p.amount}</Typography>
                  <Box style={{display:"flex", gap:"10px", justifyContent:"center"}}>
                    <Button
                      value={p._id}
                      disabled={p.amount <= 1}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={() => onAmount(p._id, p.amount - 1)}
                      style={{borderRadius:"25px"}}
                    >
                      -
                    </Button>
                    <Button
                      value={p._id}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={() => onAmount(p._id, p.amount + 1)}
                      style={{borderRadius:"25px"}}
                    >
                      +
                    </Button>
                    <Button
                      value={p._id}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={(e) => onDelete(e)}
                      style={{borderRadius:"25px"}}
                    >
                      x
                    </Button>
                  </Box>
                </div>
              );
            })}
        <br></br>
        <Typography
          style={{ marginTop: "18px", padding:"10px" }}
          variant="h5"
          color="textPrimary"
          component="div"
        >
          {!cart.length ? `Total : 0` : `Total : ${total()}`}
        </Typography>
        <Box style={{display:"flex", flexDirection:"column", gap:"10px"}}>
          <Button
            variant="contained"
            size="medium"
            disableElevation
            disabled={!cart.length}
            onClick={onBuy}
            style={{borderRadius:"5px"}}
          >
            Comprar
          </Button>
          <Button
            variant="contained"
            size="medium"
            disableElevation
            disabled={!cart.length}
            onClick={onClear}
            style={{borderRadius:"5px"}}
          >
          Limpiar Carrito
          </Button>
        </Box>
      </Stack>
    </>
  );
}
