import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { LogContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        alert("Turno cancelado");
        navigate("/");
      })
      .catch(() =>
        alert("No se puede cancelar con menos de 2hs de antelación")
      );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <Stack spacing={5}>
        {turn.date ? (
          <Card sx={{ minWidth: 275, maxWidth: 275 }}>
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
              <Typography variant="body2">Fecha {turn.date}</Typography>
              <Typography variant="body2">Hora {turn.time}</Typography>
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
        ) : (
          <>
            <Typography variant="h5" component="div">
              No posee ningún turno pendiente
            </Typography>
            <Button onClick={() => navigate("/")}>VOLVER A INICIO</Button>
          </>
        )}
      </Stack>
    </div>
  );
}
