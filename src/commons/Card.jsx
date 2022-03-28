import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ResponsiveCard({image}) {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="sucursal"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          SUCURSAL
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
        <Button variant="contained" size="small">
          RESERVAR TURNO
        </Button>
      </CardActions>
    </Card>
  );
}
