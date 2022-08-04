import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../../../redux/actions";
import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function UserFilter() {
  const dispatch = useDispatch();
  // let [filter, setFilter] = useState("");

  const handleChecked = (e) => {
    // setFilter(e.targer.value);
    dispatch(filterProducts(e.target.value));
  };

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Selecciona un Filtro</FormLabel>
          <FormGroup>
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
              control={<Checkbox value="no perecedero" onChange={handleChecked} />}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </>
  );
}
