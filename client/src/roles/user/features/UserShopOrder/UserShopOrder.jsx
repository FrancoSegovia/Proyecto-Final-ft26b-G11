import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderShops } from "../../../../redux/actions";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function UserShopOrder() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  let [order, setOrder] = useState("disabled");

  const onSelect = (e) => {
    setOrder(e.target.value);
    dispatch(orderShops(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!shops.length}>
          <Select value={order} onChange={onSelect} disabled={!shops.length}>
            <MenuItem value={"disabled"} disabled>Ordenamiento</MenuItem>
            <MenuItem value={"DEFAULT"}>Default</MenuItem>
            <MenuItem value={"AZ"}>A-Z</MenuItem>
            <MenuItem value={"ZA"}>Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
