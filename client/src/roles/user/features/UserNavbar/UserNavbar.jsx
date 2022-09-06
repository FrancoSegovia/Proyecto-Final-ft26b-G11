import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getQueryShops,
  getAllShops,
  errorCleaner,
} from "../../../../redux/actions";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { AddBusiness, Search as SearchIcon } from "@mui/icons-material";
import UserMenu from "../UserMenu/UserMenu";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [leyenda, setLeyenda] = useState("");
  const dispatch = useDispatch();
  const regExp = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  const localS = localStorage.getItem("type");

  function onChange(e) {
    e.preventDefault();
    setSearch(e.target.value);

    if (!regExp.test(e.target.value) && e.target.value !== "") {
      setLeyenda("Caracteres inválidos");
      return;
    }
    if (search.length > 2) {
      dispatch(getQueryShops(search.trim()));
    } else {
      dispatch(errorCleaner());
      dispatch(getAllShops());
      setLeyenda("");
    }
  }

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

  // const StyledInputBase = styled(InputBase)

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      // transition: theme.transitions.create("width"),
    },
    width: "270px",
    height: "40px !important",
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Click!
            </Typography>
            <Container style={{ maxWidth: "350px", display: "flex" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar Negocios"
                  inputProps={{ "aria-label": "search" }}
                  name="search"
                  type="string"
                  value={search}
                  onChange={onChange}
                  autoFocus
                />
              </Search>
              <Container style={{ minWidth: "200px", maxHeight: "40px" }}>
                {leyenda && (
                  <p
                    style={{
                      color: "#b3e5fc",
                      border: "#d50000",
                      marginTop: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    {leyenda}
                  </p>
                )}
              </Container>
            </Container>

            <UserMenu/>

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
