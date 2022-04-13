import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Map from "./Map"
import './card.css';

export default function ResponsiveCard({ branch }) {
  return (
    <div className="card">
      <CardMedia height="140" alt="sucursal">
        <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBfDTDBgoklx7Q1VwUL9_WxJzc69I6BNhI&q=${branch.coords}`}
            allowFullScreen/>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {branch.name}
        </Typography>
        <Typography
          icon={LocationOnIcon}
          variant="body2"
          color="text.secondary"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <LocationOnIcon />
          <span>Capital Federal</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/book/${branch.id}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" size="small">
            RESERVAR TURNO
          </Button>
        </Link>
      </CardActions>
      </div>
  );
}
