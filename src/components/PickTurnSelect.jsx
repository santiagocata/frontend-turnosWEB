import { useState, useEffect } from "react";
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
import Countdown from "react-countdown";
import Swal from "sweetalert2";

import axios from "axios";

import { useNavigate, Navigate } from "react-router-dom";

export default function PickTurnSelect({ id }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState({});
  const [availability, setAvailability] = useState("");
  const [branch, setBranch] = useState({});

  const navigate = useNavigate();

  const submitData = () => {
    axios
      .post(`/turn`, {
        branchId: id,
        date: date,
        time: time,
      })
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Turno reservado",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ya posee un turno pendiente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
  };

  useEffect(() => {
    axios.get(`/branch/${id}`).then((branch) => {
      setBranch(branch.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/branch/disponibility/${id}/${date}`).then((status) => {
      setStatus(status.data);
    });
  }, [date]);

  if (!branch.turnRange) {
    return <></>;
  }

  return (
    <>
      <Grid item xs={4}>
        <TextField
          sx={{ width: 220 }}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime("");
            setAvailability("");
          }}
          id="date"
          label="Elige el día"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().slice(0, 10),
          }}
        />
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
