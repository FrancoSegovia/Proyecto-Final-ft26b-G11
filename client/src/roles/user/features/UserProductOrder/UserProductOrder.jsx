import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderProducts } from "../../../../redux/actions";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function UserProductOrder() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  let [order, setOrder] = useState("DEFAULT");

  const onSelect = (e) => {
    setOrder(e.target.value);
    dispatch(orderProducts(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!products.length}>
          <InputLabel>Seleccionar un Orden</InputLabel>
          <Select value={order} onChange={onSelect} disabled={!products.length}>
            <MenuItem value={"DEFAULT"}>Default</MenuItem>
            <MenuItem value={"MAX"}>Mayor Precio</MenuItem>
            <MenuItem value={"MIN"}>Menor Precio</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
