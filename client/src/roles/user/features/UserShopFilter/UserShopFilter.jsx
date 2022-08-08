import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterShops } from "../../../../redux/actions";
import { Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function UserShopFilter() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  let [filter, setFilter] = useState("");

  const onSelect = (e) => {
    setFilter(e.target.value);
    dispatch(filterShops(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!shops.length}>
          <InputLabel>Selecciona un Tipo de Local</InputLabel>
          <Select value={filter} onChange={onSelect}>
            <MenuItem value={"ALLS"}>Cualquier Tipo</MenuItem>
            <MenuItem value={"RESTAURANT"}>Restaurant</MenuItem>
            <MenuItem value={"NO PERECEDERO"}>Almacen</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
