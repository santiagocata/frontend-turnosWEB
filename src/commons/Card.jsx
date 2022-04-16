import React, {Suspense, lazy} from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './card.css';

export default function ResponsiveCard({ branch }) {
  const {coords} = branch;

const Map = lazy(() => import("./Map"));

 return (
    <div className="card">
      <CardMedia alt="sucursal">
      <Suspense fallback={ <Box sx={{ display: 'flex' }} justifyContent="center" margin="1rem 1rem">
                                    <CircularProgress />
                                </Box>}>
        <Map coords= {coords}/>
      </Suspense>
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
          <LocationOnIcon sx={{ color: "red" }}/>
          <span>
            {branch.coords.split(",")[1].replace("+", " ").toUpperCase()}
          </span>
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: "center"}}>
        <Link to={`/book/${branch.id}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" size="small">
            RESERVAR TURNO
          </Button>
        </Link>
      </CardActions>
      </div>
  );
}
