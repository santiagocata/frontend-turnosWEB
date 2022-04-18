import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Map from "../commons/Map"
import { LogContext } from "../context/UserContext";
import { useContext, useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

export default function SingleTurn() {

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBOBzdUldoF1Kel0dPx_kJ33Vs4R-ciOPY"
  })

  const [turn, setTurn] = useState({});
  const [location, setLocation] = useState({lat: -34.60357139009188, lng: -58.38157920260902});
  const [directionResponse, setDirectionResponse] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [showMap,setShowMap] = useState(false);
  const navigate = useNavigate();

   //const objLat = { lat: -34.4891572, lng: -58.9008284};

  const { user } = useContext(LogContext);

  useEffect(() => {
    axios.get(`turn/pending/${user.id}`).then((turn) => {
      setTurn(turn.data);
      let geoLoc = navigator.geolocation;
      let watchId = geoLoc.watchPosition((position)=>{
        let latitud = position.coords.latitude;
        let longitud = position.coords.longitude;
        setLocation({lat: latitud, lng: longitud});  
    });

    
    /*eslint-disable-next-line no-undef*/    
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
        origin: location,
        destination: turn.branch.coords,
        /*eslint-disable-next-line no-undef*/
        travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((results)=>{
      setDirectionResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].distance.text);
    })

    });
  }, []);

  const cancelTurn = () => {
    axios
      .put(`turn/state/cancel/${user.id}`)
      .then((turn) => {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Su turno se ha cancelado",
          showConfirmButton: true,
          timer: 2000,
        });
        navigate("/");
      })
      .catch(() =>
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "No se puede cancelar con menos de 2hs de antelación",
          showConfirmButton: false,
          timer: 2000,
        })
      );
  };
  
  function calcuteRoute(){
    setShowMap(true);
    if(location=== undefined || turn.branch.coords=== undefined){
      return 
    }
    /*eslint-disable-next-line no-undef*/    
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
        origin: location,
        destination: turn.branch.coords,
        /*eslint-disable-next-line no-undef*/
        travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((results)=>{
      setDirectionResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].distance.text);
    })
    
  }


  if(!isLoaded){
    return <Box sx={{ display: 'flex' }} justifyContent="center" margin="1rem 1rem">
              <CircularProgress />
          </Box>
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative", marginTop: 30 }}>
      <Stack spacing={5}>
        {turn.date ? (<>
          <Card sx={{ minWidth: 275, maxWidth: "100%", justifyContent:"center"}}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                PENDIENTE
              </Typography>
              <Typography variant="h5" component="div">
                {turn.branch.name}
              </Typography>
              <Typography variant="body2">Fecha: <strong>{turn.date.substring(8,10)+"/"+turn.date.substring(5,7)+"/"+turn.date.substring(0,4)}</strong></Typography>
              <Typography variant="body2">Hora: <strong>{turn.time}hs</strong></Typography>
              <Typography variant="body2">Dirección: <strong>{turn.branch.coords.replaceAll('+',' ').replace(',','; ').split(',',1)}</strong></Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => cancelTurn()}
                style={{ color: "red" }}
                size="small"
              >
                CANCELAR TURNO
              </Button>
              <Button
                onClick={() => navigate(`/changeturn/${turn.branchId}`)}
                style={{ color: "green" }}
                size="small"
              >
                EDITAR TURNO
              </Button>
            </CardActions>
          </Card>
          <Button variant="contained" size="small" onClick={calcuteRoute}>
            CALCULAR RUTA
          </Button>
          {showMap ? 
            <Box position={"relative"} left={0} sx={{ width: 360, height: 500 }}>
              <GoogleMap center={location} mapContainerStyle={{width:"100%", height:"100%"}} zoom={13}>
                <Marker position={location}/>
                {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
              </GoogleMap>
            </Box> : <></>
          }
          </>
        ) : (
          <div style={{ display: "block", marginTop: 60, textAlign:"center" }}>
            <Typography variant="h5" component="div">
              No posee ningún turno pendiente
            </Typography>
            <Button onClick={() => navigate("/")}>VOLVER A INICIO</Button>
          </div>
        )}
    </Stack>
    </div>
  );
}
