import React from "react";
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import AppBar from "../AppBar/AppBar";
import ToolBar from "../ToolBar/ToolBar";

export default function LandingAppBar() {
  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ flex: 1 }} />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/premium-themes/onepirate/"
              sx={{ fontSize: 24 }}
            >
              {"onepirate"}
            </Link>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/premium-themes/onepirate/sign-in/"
                sx={rightLink}
              >
                {"Sign In"}
              </Link>
              <Link
                variant="h6"
                underline="none"
                href="/premium-themes/onepirate/sign-up/"
                sx={{ ...rightLink, color: "secondary.main" }}
              >
                {"Sign Up"}
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    </>
  );
}
