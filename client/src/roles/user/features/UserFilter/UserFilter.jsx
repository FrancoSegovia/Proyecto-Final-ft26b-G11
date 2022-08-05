import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../../../redux/actions";
import {
  Box,
  FormControl,
  Select,
  InputLabel,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";

export default function UserFilter() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  // let [filter, setFilter] = useState("");

  // const handleChecked = (e) => {
  //   // setFilter(e.targer.value);
  // };

  const onSelect = (e) => {
    dispatch(filterProducts(e.target.value));
  };

  return (
    <>
      <Box>
        {/* <FormControl>
          <FormLabel>Selecciona un Filtro</FormLabel>
          <FormGroup aria-disabled={!products.length}>
            <FormControlLabel
              label="Comida"
              control={<Checkbox value="comida" onChange={handleChecked} />}
            />
            <FormControlLabel
              label="Bebida"
              control={<Checkbox value="bebida" onChange={handleChecked} />}
            />
            <FormControlLabel
              label="Restaurant"
              control={<Checkbox value="restaurant" onChange={handleChecked} />}
            />
            <FormControlLabel
              label="No Perecedero"
              control={
                <Checkbox value="no perecedero" onChange={handleChecked} />
              }
            />
          </FormGroup>
        </FormControl> */}

        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!products.length}>
          <InputLabel>Selecciona un Tipo de Producto</InputLabel>
          <Select onChange={onSelect}>
            <MenuItem value={"ALLP"}>Cualquier Tipo</MenuItem>
            <MenuItem value={"COMIDA"}>Comida</MenuItem>
            <MenuItem value={"BEBIDA"}>Bebida</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 270 }} disabled={!products.length}>
          <InputLabel>Seleccionaun Tipo de Local</InputLabel>
          <Select onChange={onSelect}>
            <MenuItem value={"ALLS"}>Cualquier Tipo</MenuItem>
            <MenuItem value={"RESTAURANT"}>Restaurant</MenuItem>
            <MenuItem value={"NO PERECEDERO"}>Almacen</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
