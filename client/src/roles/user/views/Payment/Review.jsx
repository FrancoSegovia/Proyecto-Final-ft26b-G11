import React from "react";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Review() {
  const products = JSON.parse(localStorage.getItem("cart"));
  const total = JSON.parse(localStorage.getItem("total"));

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Resumen del Pedido
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.amount} />
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
