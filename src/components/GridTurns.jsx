import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { AiOutlineCheck } from "react-icons/ai";
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
      field: "action",
      headerName: "Asistencia",
      sortable: false,

      renderCell: (params) => {
        const onClick = (e) => {
          asistTurn(params.row.user.id, params.row.user.state);
          setLoading(!loading);
        };

        if (params.row.state === "assisted")
          return (
            <Button
              style={{ color: "black", cursor: "default" }}
              startIcon={<AiOutlineCheck />}
            ></Button>
          );

        return (
          <Button onClick={onClick} startIcon={<AiOutlineCheck />}></Button>
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
    console.log(id);
    await axios.put(`/turn/state/${state}/${id}`);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Panel de turnos</h1>
      <div style={{ height: 600, width: "100%" }}>
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
