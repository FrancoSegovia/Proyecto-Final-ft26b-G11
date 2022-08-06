import React from "react";
import {
  Card,
  Container,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function UserCard({ local }) {
  const styles = {
    media: {
      width: "150px",
      borderRadius: "15%",
    },
  };
  return (
    <div>
      <Card variant="standard" sx={{ maxWidth: 400, minWidth: 400 }} style={{ marginTop: "15px", backgroundColor: "whitesmoke" }}>
        <Container
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
            alignItems:"center",
          }}
        >
          <CardContent>
            <Typography variant="h5" color="textPrimary" component="div">
              {local.name}
            </Typography>
          </CardContent>

          <CardMedia component="img" style={styles.media} image={local.image} />
          
        </Container>

        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>

          <IconButton styles={styles.addBtn}>
            <AddIcon />
          </IconButton>
        </CardActions>

      </Card>
    </div>
  );
}

export default UserCard;
