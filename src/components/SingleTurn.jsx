import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Map from "../commons/Map"
import { LogContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./singleTurn.css";

export default function SingleTurn() {
  const [turn, setTurn] = useState({});
  const navigate = useNavigate();

  const { user } = useContext(LogContext);

  useEffect(() => {
    axios.get(`turn/pending/${user.id}`).then((turn) => {
      setTurn(turn.data);
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

  return (
    <div className="singleTurn">
         
        {turn.date ? (<>
        <Card sx={{ minWidth: 300, maxWidth: 300}}>
            <CardContent >
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
          <Box style={{margin: "0.2rem", minWidth: 300, maxWidth: 300}}> 
            <Map coords={turn.branch.coords}/> 
          </Box>
          </>
        ) : (
          <div style={{ display: "block", marginTop: 60, textAlign:"center" }}>
            <Typography variant="h5" component="div">
              No posee ningún turno pendiente
            </Typography>
            <Button onClick={() => navigate("/")}>VOLVER A INICIO</Button>
          </div>
        )}
   
    </div>
  );
}
