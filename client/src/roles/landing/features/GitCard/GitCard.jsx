import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";
import { Link } from "@mui/material";

export default function GitCard({ data }) {
  return (
    <Card sx={{ minWidth: "13vw", maxWidth: "13vw", padding: "2vw" }}>
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "36vh" }}
      >
        <CardMedia
          component="img"
          height="100vh"
          image={data.avatar_url}
          alt={data.avatar_url}
          style={{ objectFit: "contain" }}
        />

        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography align="center" variant="body1" color="text.secondary">
            {data.bio}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            {data.location}
          </Typography>
        </CardContent>
      </Box>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Link href={data.html_url} target="blank">
          <GitHubIcon sx={{ fontSize: "4vw" }} />
        </Link>
        <Link href={data.blog} target="blank">
          <LinkedInIcon sx={{ fontSize: "4vw" }} />
        </Link>
      </CardActions>
    </Card>
  );
}
