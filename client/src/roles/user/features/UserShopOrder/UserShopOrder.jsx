import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderShops } from "../../../../redux/actions";

import { Box, FormControl, Select, MenuItem } from "@mui/material";

export default function UserShopOrder() {
  const dispatch = useDispatch();
  let [order, setOrder] = useState("disabled");

  const onSelect = (e) => {
    setOrder(e.target.value);
    dispatch(orderShops(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 270 }}>
          <Select value={order} onChange={onSelect}>
            <MenuItem value={"disabled"} disabled>
              Ordenamiento
            </MenuItem>
            <MenuItem value={"DEFAULT"}>Default</MenuItem>
            <MenuItem value={"AZ"}>A-Z</MenuItem>
            <MenuItem value={"ZA"}>Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
