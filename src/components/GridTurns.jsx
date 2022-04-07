import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsFillAlarmFill } from "react-icons/bs";
import { LogContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";

export default function GridTurns() {
  const { user } = useContext(LogContext);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(false);

  let columns = [
    { field: "date", headerName: "Fecha", width: 180 },
    { field: "time", headerName: "Hora", width: 180 },
    { field: "state", headerName: "Estado", width: 180 },
    {
      field: "name",
      headerName: "Nombre",
      width: 180,
      valueGetter: (params) => params.row.user.name,
    },
    {
      field: "lastname",
      headerName: "Apellido",
      width: 180,
      valueGetter: (params) => params.row.user.lastname,
    },

    {
      field: "actions",
      headerName: "Asistió",
      sortable: false,

      renderCell: (params) => {
        const onClick = (e) => {
          asistTurn(params.row.user.id, "assisted");
          setLoading(!loading);
        };

        if (
          params.row.state === "assisted" ||
          params.row.state === "missed" ||
          params.row.state === "canceled"
        )
          return (
            <Button
              disabled={true}
              style={
                params.row.state === "assisted"
                  ? { color: "lightgreen", cursor: "default" }
                  : params.row.state === "missed"
                  ? { color: "red", cursor: "default" }
                  : { color: "gray", cursor: "default" }
              }
              startIcon={<AiOutlineCheck />}
            ></Button>
          );

        return (
          <Button onClick={onClick} startIcon={<AiOutlineCheck />}></Button>
        );
      },
    },
    {
      field: "action",
      headerName: "Faltó",
      sortable: false,

      renderCell: (params) => {
        const onClick = (e) => {
          asistTurn(params.row.user.id, "missed");
          setLoading(!loading);
        };

        if (
          params.row.state === "assisted" ||
          params.row.state === "missed" ||
          params.row.state === "canceled"
        )
          return (
            <Button
              disabled={true}
              style={
                params.row.state === "assisted"
                  ? { color: "lightgreen", cursor: "default" }
                  : params.row.state === "missed"
                  ? { color: "red", cursor: "default" }
                  : { color: "gray", cursor: "default" }
              }
              startIcon={<BsFillAlarmFill />}
            ></Button>
          );

        return (
          <Button onClick={onClick} startIcon={<BsFillAlarmFill />}></Button>
        );
      },
    },
    {
      field: "actionss",
      headerName: "Cancelar",
      sortable: false,

      renderCell: (params) => {
        const onClick = (e) => {
          asistTurn(params.row.user.id, "cancel");
          setLoading(!loading);
        };

        if (
          params.row.state === "assisted" ||
          params.row.state === "missed" ||
          params.row.state === "canceled"
        )
          return (
            <Button
              disabled={true}
              style={
                params.row.state === "assisted"
                  ? { color: "lightgreen", cursor: "default" }
                  : params.row.state === "missed"
                  ? { color: "red", cursor: "default" }
                  : { color: "gray", cursor: "default" }
              }
              startIcon={<AiOutlineClose />}
            ></Button>
          );

        return (
          <Button onClick={onClick} startIcon={<AiOutlineClose />}></Button>
        );
      },
    },
  ];

  const petitionGet = async () => {
    try {
      let turns = await axios.get(`/turn/branch/${user.branch.id}/${date}`);
      setTurns(turns.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    petitionGet();
  }, [loading]);

  const [pageSize, setPageSize] = useState(10);

  const asistTurn = async (id, state) => {
    await axios.put(`/turn/state/${state}/${id}`).catch((err) => {
      alert("No se pueden cancelar turnos a menos de 2 horas de su horario");
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Panel de turnos</h1>
      <div style={{ height: 600, width: "100%" }}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <TextField
            sx={{ width: 220, mb: 2 }}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setLoading(!loading);
              petitionGet();
            }}
            id="date"
            label="Elige el día"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          columns={columns}
          rows={turns}
          initialState={{
            sorting: {
              sortModel: [{ field: "time", sort: "asc" }],
            },
          }}
          isRowSelectable={(params) => false}
        />
      </div>
    </>
  );
}
