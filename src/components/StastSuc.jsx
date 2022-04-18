import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { LogContext } from "../context/UserContext";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

const StastSuc = () => {
  const { user } = useContext(LogContext);
  const [stats, setStats] = useState({});
  const [value, setValue] = useState([null, null]);
  console.log(stats);
  useEffect(() => {
    axios
      .get(`/branch/stats/${user?.branch.id}/2022-04-01/2022-04-31`)
      .then((data) => setStats(data.data));
  }, []);

  const data = [
    { argument: "Asitidos", value: stats?.assisted },
    { argument: "No-asistidos", value: stats?.missed },
    { argument: "Cancelados", value: stats?.canceled },
  ];
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Check-in"
          endText="Check-out"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <div style={{ width: "25%" }}>
        <h1 style={{ textAlign: "center" }}>Estadisticas de asitencias</h1>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      </div>
      <h2>
        Cantidad de turnos:{stats?.assisted + stats?.missed + stats?.canceled}
      </h2>
    </>
  );
};

export default StastSuc;
