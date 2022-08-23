import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../../redux/actions";
import jwtDecode from "jwt-decode";

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

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders(jwtDecode(localStorage.getItem("token"))._id));
  }, []);

  return (
    <>
      <Stack>
        <Typography
          id="transition-modal-title"
          style={{ textAlign: "center" }}
          variant="h5"
        >
          Pedidos
        </Typography>
        <br></br>
        {!orders.length
          ? "No Tiene Pedidos Pendientes"
          : 
          <div>
           <Typography variant="body2" gutterBottom>
                    Usted tiene {orders.length} Pedidos pendientes
            </Typography>
            {orders.map((p) => {
              return (
                <div>
                   <Typography variant="subtitle1">{p.state}</Typography>
                </div>
              );
            })}
          </div>
           }
      </Stack>
    </>
  );
}
