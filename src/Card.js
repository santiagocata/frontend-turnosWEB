import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ResponsiveCard() {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://www.lavoz.com.ar/resizer/Bjy9UDOD3C7yj2CC6tjrVFJJZjw=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/2QQKMCSIRFHGNPPEY35YR5LLDQ.jpg"
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
