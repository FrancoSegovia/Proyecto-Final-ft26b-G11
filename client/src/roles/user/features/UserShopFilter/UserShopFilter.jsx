import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterShops } from "../../../../redux/actions";

import { Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function UserShopFilter() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  let [filter, setFilter] = useState("disabled");

  const onSelect = (e) => {
    setFilter(e.target.value);
    dispatch(filterShops(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!shops.length}>
          <Select value={filter} onChange={onSelect} disabled={!shops.length}>
            <MenuItem value={"disabled"} disabled>Tipo de negocio</MenuItem>
            <MenuItem value={"DEFAULT"}>Cualquier Tipo</MenuItem>
            <MenuItem value={"BAR"}>Bar</MenuItem>
            <MenuItem value={"HELADERIA"}>Heladeria</MenuItem>
            <MenuItem value={"RESTAURANT"}>Restaurant</MenuItem>
            <MenuItem value={"ROTISERIA"}>Rotiseria</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
