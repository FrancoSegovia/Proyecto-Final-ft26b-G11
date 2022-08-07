import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterShops } from "../../../../redux/actions";
import { Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function UserShopFilter() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  let [filter, setFilter] = useState("")

  const onSelect = (e) => {
    dispatch(filterShops(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!shops.length}>
          <InputLabel>Selecciona un Tipo de Producto</InputLabel>
          <Select value={filter} onChange={onSelect} disabled={!shops.length}>
            <MenuItem value={"ALLP"}>Cualquier Tipo</MenuItem>
            <MenuItem value={"COMIDA"}>Comida</MenuItem>
            <MenuItem value={"BEBIDA"}>Bebida</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
