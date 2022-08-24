import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import GitCard from "../../features/GitCard/GitCard"
import { getProfiles } from "../../../../redux/actions";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
const names= ["CesarLinkero", "FrancoSegovia","braianaguada", "emilioalvarez05", "Octavio4422"]

const Profile = () => {

  const dispatch = useDispatch();
  const profiles= useSelector((state) => state.profiles);


  useEffect(() => {
    if (!profiles.length) names.forEach(n => dispatch(getProfiles(n)))
  }, [])

  return (
    <>
      <Box style={{ padding: 20, display:"flex"}}>
          {profiles?.map((p) => {return (<div><GitCard data={p}/></div>)})}
      </Box>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
      </Link>
    </>
  );
};
export default Profile;