import React, { useState } from "react";
import {
  Card,
  Container,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
  CardActions,
  Box,
  Fade,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import defaultShop from "../../../../media/defaultShop.jpg";

function UserCard({ shop }) {
  const [open, setOpen] = useState(false);
  const onCardClick = (e) => setOpen(true);
  const onCardClose = (e) => setOpen(false);

  const styles = {
    media: {
      alignSelf: "center",
      width: "150px",
      borderRadius: "15%",
    },
  };

  const closeButtonStyle = {
    alignSelf: "flex-end",
    transition: "0.25s",
  };

  const modalStyle = {
    outline: "none",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: "calc(100vh - 210px)",
    overflow: "hidden",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onCardClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <IconButton
              sx={{ "&:hover": { backgroundColor: "#e8e8e8" } }}
              style={closeButtonStyle}
              onClick={() => setOpen(false)}
            >
              <ClearIcon />
            </IconButton>

            <Typography
              id="transition-modal-title"
              style={{ textAlign: "center" }}
              variant="h3"
              component="h3"
            >
              {shop.name}
            </Typography>

            <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h5"
                  style={{margin:""}}
                >
                  {shop.description?.length ? shop.description : "Este negocio no cuenta con una descripción." }
            </Typography>

            <Typography
              id="transition-modal-title"
              style={{ marginTop: "20px", textAlign: "center" }}
              variant="h5"
              component="h5"
              color="textSecondary"
            >
              {shop.products.length
                ? `Menú de ${shop.name}`
                : "Este negocio aún no cuenta con productos."}
            </Typography>

            <Container
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                marginBottom: "20px",
              }}
            >
              {shop.products.map((product) => {
                return (
                  <Card
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    style={{
                      margin: "15px 0px",
                      backgroundColor: "whitesmoke",
                      padding: "20px",
                      maxWidth: "200px",
                    }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        style={styles.media}
                        image={product.image}
                      />

                      <Typography
                        style={{ marginTop: "18px" }}
                        variant="h4"
                        color="textPrimary"
                        component="div"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        component="div"
                      >
                        {"$" + product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Container>
          </Box>
        </Fade>
      </Modal>

      <Card
        sx={{ maxWidth: 400, minWidth: 400, "&:hover": { cursor: "pointer" } }}
        style={{ marginTop: "15px", backgroundColor: "whitesmoke" }}
        onClick={onCardClick}
      >
        <Container
          style={{
            display: "flex",
            marginTop: "20px",
            marginBottom: "20px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4" color="textPrimary" component="div">
              {shop.name}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="div"
              style={{ textAlign: "left" }}
            >
              {shop.category}
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            style={styles.media}
            image={shop.image ? shop.image : defaultShop}
          />
        </Container>
      </Card>
    </div>
  );
}

export default UserCard;
