import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderProducts } from "../../../../redux/actions";

import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";

export default function UserOrder() {
  const dispatch = useDispatch();
  // let [selectInput, setSelectInput] = useState("");

  const onSelect = (e) => {
    // setSelectInput(e.target.value);
    // dispatch(orderProducts(selectInput));
    dispatch(orderProducts(e.target.value));
  };

  //Use state da un delay en la ejecucion del dispatch
  //hay que agreagar una propiedad value al Select para que se controle

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Seleccionar un Orden</InputLabel>
        <Select onChange={onSelect}>
          <MenuItem value="">
            {" "}
            <em>None</em>{" "}
          </MenuItem>
          <MenuItem value={"max"}>Mayor Precio</MenuItem>
          <MenuItem value={"min"}>Menor Precio</MenuItem>
        </Select>
        <FormHelperText>Ordenar por</FormHelperText>
      </FormControl>
    </>
  );
}
