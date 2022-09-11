import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../../redux/actions";
import jwtDecode from "jwt-decode";

import { Stack, Typography } from "@mui/material";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders(jwtDecode(localStorage.getItem("token"))._id));
  }, []);

  return (
    <>
      <Stack style={{ marginTop: "3vw" }}>
        <Typography
          id="transition-modal-title"
          style={{ textAlign: "center" }}
          variant="h5"
        >
          Pedidos
        </Typography>

        {!orders.length ? (
          "No Tiene Pedidos Pendientes"
        ) : (
          <div>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ padding: "20px 0px" }}
            >
              Usted tiene{" "}
              <span style={{ fontWeight: "bold" }}>{orders.length}</span>{" "}
              Pedidos pendientes
            </Typography>
            {orders.map((p) => {
              return (
                <Typography variant="subtitle1">
                  {p.state} <hr />
                </Typography>
              );
            })}
          </div>
        )}
      </Stack>
    </>
  );
}
