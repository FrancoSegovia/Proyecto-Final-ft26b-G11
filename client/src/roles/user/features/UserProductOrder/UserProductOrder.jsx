import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderProducts } from "../../../../redux/actions";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function UserProductOrder() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
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
      <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!products.length}>
        <InputLabel>Seleccionar un Orden</InputLabel>
        <Select onChange={onSelect}>
          <MenuItem value={"DEFAULT"}>Default</MenuItem>
          <MenuItem value={"MAX"}>Mayor Precio</MenuItem>
          <MenuItem value={"MIN"}>Menor Precio</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
