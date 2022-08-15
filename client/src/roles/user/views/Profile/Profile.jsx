import React from 'react'
import { Container, TextField, Box, FormLabel, Typography, Button, Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack, Edit, LockOutlined, SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';

function Profile() {
    
    useEffect(() => {

    }, [])

    
    const [editFlag, setEditFlag] = useState(true);
    const [msg, setMsg] = useState(false);
    const [input, setInput] = useState({
        name:"",
        lastname:"",
        password:""
    })

    const onInputChange = (e) => {
        e.preventDefault();
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
      };

    const onEditClick = () => {
        setEditFlag(false);
    }

    const onConfirmClick = () => {
        setEditFlag(true);
        setMsg(true);
        setTimeout(() => {
            setMsg(false);
        }, 3000);
    }

  return (
    <div>
        <Container style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", maxWidth:"100vw", height:"100vh"}}>
            <Box
            component = "form"
            noValidate
            autoComplete="off"
            style={{fontSize:"16px",fontFamily:"roboto", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"20px"}}
            sx={{width:"50vw", height:"70vh"}}
            >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h4" style={{padding:"0 25px 25px 25px"}}>
                    Mi perfil
                </Typography>

                        <FormLabel>Nombre</FormLabel>
                    <TextField style={editFlag ? {backgroundColor:"#d1d1d1"} : null} variant="outlined" value={input.name} name="name" onChange={onInputChange} disabled={editFlag}></TextField>
    
                        <FormLabel>Apellido</FormLabel>
                    <TextField style={editFlag ? {backgroundColor:"#d1d1d1"} : null} variant="outlined" value={input.lastname} name="lastname" onChange={onInputChange} disabled={editFlag}></TextField>
                
                            <FormLabel>Contraseña</FormLabel>
                    <TextField style={editFlag ? {backgroundColor:"#d1d1d1"} : null} variant="outlined" type="password" value={input.password} name="password" onChange={onInputChange} disabled={editFlag}></TextField>
                    {editFlag ? 
                        <IconButton style={{color:"#1976d2"}} onClick={onEditClick}>
                            <Edit/>
                        </IconButton>
                    :
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={onConfirmClick}>
                            Confirmar cambios
                        </Button>
                    }
                    { msg ? 
                        <Box>
                            <Typography style={{color:"#1976d2"}}>¡Los cambios han sido guardados correctamente!</Typography>
                        </Box>
                    :
                        null
                    }
                    

                <Link to="/user/home" style={{ textDecoration: "none", color: "white", marginTop:"30px"}}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
                </Link>
            </Box>
        </Container>
    </div>
  )
}

export default Profile