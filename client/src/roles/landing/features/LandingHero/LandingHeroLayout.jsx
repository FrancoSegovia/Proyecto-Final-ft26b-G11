import React from "react";
import PropTypes from "prop-types";

import { Box, Container, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArrowDownward } from "@mui/icons-material";

const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "95vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

const IconHover = {
  color: "#1976d2",
  "&hover": {
    color: "white",
    backgroundColor: "#1976d2",
  },
};

function ProductHeroLayout(props) {
  const { sxBackground, children } = props;

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 8,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}

        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "white",
            opacity: 0.5,
            zIndex: -1,
          }}
        />

        <Background sx={{ sxBackground }} />

        <IconButton>
          <ArrowDownward
            sx={{
              fontSize: "70px",
              top: "4vw",
              position: "absolute",
            }}
            style={IconHover}
          />
        </IconButton>
      </Container>
    </ProductHeroLayoutRoot>
  );
}

ProductHeroLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ProductHeroLayout;
