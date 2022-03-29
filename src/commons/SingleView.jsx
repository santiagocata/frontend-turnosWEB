import { useState } from "react";
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

export default function SingleView() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState("");

  const { id } = useParams();

  const submitData = () => {
    console.log({ turn: `${date}T${time}:00.000Z`, sucursal: id });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: "60px",
      }}
    >
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
            {genTurns(8, 16).map((turn, i) => {
              return (
                <MenuItem
                  onClick={() => {
                    setTime(turn);
                    setAvailability(Math.floor(Math.random() * 10) + 1);
                  }}
                  key={i}
                  value={turn}
                >
                  {turn}
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
    </Grid>
  );
}
