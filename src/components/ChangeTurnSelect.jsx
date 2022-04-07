import { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router";
import genTurns from "../utils/genTurns";

import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import { useNavigate } from "react-router-dom";
import { LogContext } from "../context/UserContext";
import Swal from "sweetalert2";

export default function ChangeTurnSelect() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState({});
  const [availability, setAvailability] = useState("");
  const [branch, setBranch] = useState({});

  const { id } = useParams();

  const { user } = useContext(LogContext);

  const navigate = useNavigate();

  const submitData = () => {
    axios
      .put(`/turn/edit/${user.id}`, {
        date: date.toISOString().slice(0, 10),
        time: time,
      })
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Su turno ha sido modificado",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myturn");
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No se puede editar el turno con menos de 2hs de antelación",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myturn");
      });
  };

  useEffect(() => {
    axios.get(`/branch/${id}`).then((branch) => {
      setBranch(branch.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/branch/disponibility/${id}/${date.toISOString().slice(0, 10)}`)
      .then((status) => {
        setStatus(status.data);
      });
  }, [date]);

  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  if (!branch.turnRange) {
    return null;
  }

  return (
    <>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Elige el día"
            value={date}
            inputFormat="dd/MM/yyyy"
            onChange={(e) => {
              setDate(e);
              setTime("");
              setAvailability("");
            }}
            shouldDisableDate={disableWeekends}
            minDate={tomorrow}
            renderInput={(params) => (
              <TextField sx={{ width: 220 }} {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}>
        <FormControl>
          <InputLabel>Elige el horario</InputLabel>
          <Select sx={{ width: 220 }} value={time} label="Elige el horario">
            {genTurns(
              JSON.parse(branch.turnRange).open,
              JSON.parse(branch.turnRange).close,
              branch.maxPerTurn,
              status
            ).map((turn, i) => {
              return (
                <MenuItem
                  onClick={() => {
                    setTime(turn.time);
                    setAvailability(turn.available);
                  }}
                  key={i}
                  value={turn.time}
                >
                  {turn.time}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      {!time == "" && (
        <Grid item xs={4}>
          <TextField
            sx={{ width: 220 }}
            id="outlined-read-only-input"
            label="Turnos disponibles"
            value={availability}
            color="success"
            disabled
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      )}

      <Grid item xs={4}>
        <Button
          onClick={submitData}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={time === ""}
        >
          RESERVAR
        </Button>
      </Grid>
    </>
  );
}
