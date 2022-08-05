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

function UserCard({ food }) {
  const styles = {
    media: {
      width: "150px",
      borderRadius: "15%",
    },
  };
  return (
    <div>
      <Card sx={{ maxWidth: 500, minWidth: 500 }} style={{ marginTop: "15px", backgroundColor: "whitesmoke" }}>
        <Container
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="textPrimary" component="div">
              {food.name}
            </Typography>
          </CardContent>

          <CardMedia component="img" style={styles.media} image={food.image} />
          
        </Container>

        <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" color="textSecondary" component="span" style={{ marginLeft: "20px" }}>
            {"$" + food.price}
          </Typography>

          <IconButton styles={styles.addBtn}>
            <AddIcon />
          </IconButton>
        </CardActions>

      </Card>
    </div>
  );
}

export default UserCard;
