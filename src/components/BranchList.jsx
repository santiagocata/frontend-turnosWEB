import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AdminView from "./AdminView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

function BranchList() {
  const [visibility, setVisibility] = useState(false);
  const [branchs, setBranchs] = useState([]);

  const deleteBranch = (id) => {
    const newBranchs = branchs.filter((row) => row.id !== id);
    axios.delete(`http://localhost:3001/branch/${id}`);
    setBranchs(newBranchs);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/branch/adminview")
      .then((res) => setBranchs(res.data));
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 140,
    },
    {
      field: "user",
      headerName: "Email",
      valueGetter: (params) => params.row.user.email,
      width: 200,
    },
    { field: "coords", headerName: "Coordenadas", width: 200 },
    { field: "maxPerTurn", headerName: "Turnos", width: 120 },
    {
      field: "turnRange",
      headerName: "Rango Horario",
      valueGetter: (params) => {
        const obj = JSON.parse(params.row.turnRange);
        let hours = [];
        if (obj.open < 10) hours.push(`0${obj.open}:00`);
        else hours.push(`${obj.open}:00`);
        if (obj.close < 10) hours.push(`0${obj.close}:00`);
        else hours.push(`${obj.close}:00`);
        return "Desde las " + hours[0] + " a las " + hours[1];
      },
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteBranch(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const toggleVissibility = (e) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return visibility ? (
    <>
      <div style={{ position: "relative", right: "238px" }}>
        <Fab
          sx={{
            position: "absolute",
            left: "50vw",
            top: 105,
          }}
          aria-label="Add"
          color="primary"
          onClick={toggleVissibility}
        >
          <ArrowBackIcon />
        </Fab>
      </div>
      <AdminView
        setBranchs={setBranchs}
        visibility={visibility}
        setVisibility={setVisibility}
      ></AdminView>
    </>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <h1 style={{ marginBottom: "42px", marginTop: "42px" }}>Sucursales</h1>
      <Box sx={{ position: "relative" }} height={580} marginBottom={8}>
        <DataGrid
          sx={{ width: "50vw" }}
          columns={columns}
          rows={branchs}
        ></DataGrid>
        <div style={{ position: "relative", right: "75px" }}>
          <Fab
            sx={{
              position: "absolute",
              left: "50vw",
              bottom: 90,
            }}
            aria-label="Add"
            color="primary"
            onClick={toggleVissibility}
          >
            <AddIcon />
          </Fab>
        </div>
      </Box>
    </Box>
  );
}

export default BranchList;
