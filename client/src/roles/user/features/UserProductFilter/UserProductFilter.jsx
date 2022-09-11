import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../../../redux/actions";

import { Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function UserProductFilter() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  let [filter, setFilter] = useState("DEFAULT");

  const onSelect = (e) => {
    setFilter(e.target.value);
    dispatch(filterProducts(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!products.length}>
          <InputLabel>Selecciona un Tipo de Producto</InputLabel>
          <Select value={filter} onChange={onSelect} disabled={!products.length}>
            <MenuItem value={"DEFAULT"}>Cualquier Tipo</MenuItem>
            <MenuItem value={"COMIDA"}>Comida</MenuItem>
            <MenuItem value={"BEBIDA"}>Bebida</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
