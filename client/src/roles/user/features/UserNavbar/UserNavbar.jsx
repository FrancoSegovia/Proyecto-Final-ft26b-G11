import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import { getQueryProducts, getAllProducts, errorCleaner} from "../../../../redux/actions";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function onChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    if (search.length > 2) dispatch(getQueryProducts(search));
    else {
      dispatch(errorCleaner());
      dispatch(getAllProducts());
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
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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
      width: "100%",
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
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Click!
            </Typography>
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
            {/* <Button variant="text" color="inherit" onClick={onSubmit}>
              Buscar
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
