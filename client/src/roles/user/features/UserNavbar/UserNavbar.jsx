import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Container,
  IconButton
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { getQueryLocals, getAllLocals, errorCleaner} from "../../../../redux/actions";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function onChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    if (search.length > 2) dispatch(getQueryLocals(search));
    else {
      dispatch(errorCleaner());
      dispatch(getAllLocals());
    }
  }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   //aca va el dispatch de la action que busca
  // }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",

  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
    },
  }));

  return (
    <div>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Click!
            </Typography>
            <Container style={{maxWidth:"350px"}}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Product"
                  inputProps={{ "aria-label": "search" }}
                  name="search"
                  type="string"
                  value={search}
                  onChange={onChange}
                  autoFocus
                />
              </Search>
            </Container>
            <Link to="/create" style={{textDecoration:"none", color:"white"}}>
              <Button variant="contained" color="primary" size="small">
                
                  Ingrese un nuevo local
                  <IconButton style={{color:"white"}}>
                    <AddBusinessIcon/>
                  </IconButton>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
