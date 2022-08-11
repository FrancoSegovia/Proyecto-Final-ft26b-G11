import React from "react";
import MuiAppBar from "@mui/material/AppBar";

export default function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}
