import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";
import { Link } from "@mui/material";

export default function GitCard({data}) {
  return (
    <Card sx={{minWidth: 345}}>
      <CardMedia
        component="img"
        height="200"
        image={data.avatar_url}
        alt={data.avatar_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.bio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.location}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
          <Link href={data.html_url} target="blank">
            <GitHubIcon />
          </Link>
          <Link href={data.blog} target="blank">
            <LinkedInIcon />
          </Link>
      </CardActions>
    </Card>
  );
}