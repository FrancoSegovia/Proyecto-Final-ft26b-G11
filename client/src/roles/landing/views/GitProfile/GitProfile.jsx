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
    names.forEach(n => dispatch(getProfiles(n)))
  }, [])

  return (
    <>
      <Box style={{minWidth:"100vw", minHeight:"100vh", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
        <Box style={{ padding: 20, display:"flex", flexWrap:"wrap", gap:"1.5vw", justifyContent:"center"}}>
            {profiles?.map((p) => {return (<GitCard data={p}/>)})}
        </Box>
        
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                    <Button variant="contained" startIcon={<ArrowBack />}>
                      Regresar
                    </Button>
        </Link>
      </Box>
    </>
  );
};
export default Profile;