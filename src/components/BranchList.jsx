import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AdminView from "./AdminView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

function BranchList() {
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState("add");
  const [branchs, setBranchs] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});

  const deleteBranch = (id) => {
    const newBranchs = branchs.filter((row) => row.id !== id);
    axios.delete(`/branch/${id}`);
    setBranchs(newBranchs);
  };

  const editBranch = (id) => {
    const branch = branchs.filter((row) => row.id === id);
    setSelectedBranch(branch);
    setType("edit");
    setVisibility(true);
  };

  useEffect(() => {
    axios
      .get("/branch/adminview")
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
    {
      field: "coords",
      headerName: "Coordenadas",
      valueGetter: (params) => {
        let string = "";
        for (let i = 0; i < params.row.coords.length; i++) {
          if (params.row.coords[i] === ",") break;
          if (params.row.coords[i] === "+") {
            string += " ";
            continue;
          }
          string += params.row.coords[i];
        }
        return string;
      },
      width: 200,
    },
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
          icon={<EditIcon />}
          label="Edit"
          onClick={() => editBranch(params.id)}
          showInMenu
        />,
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
    setType("add");
    setSelectedBranch([]);
    setVisibility(!visibility);
  };

  return visibility ? (
    <>
      <div style={{ position: "relative", right: "238px" }}>
        <>
          <Fab
            sx={{
              position: "absolute",
              left: "27vw",
              top: 60,
            }}
            aria-label="Add"
            color="primary"
            onClick={toggleVissibility}
          >
            <ArrowBackIcon />
          </Fab>
        </>
      </div>
      <AdminView
        type={type}
        selectedBranch={selectedBranch}
        setBranchs={setBranchs}
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
      <h1 style={{ marginBottom: "6vh", marginTop: "6vh" }}>Sucursales</h1>
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
              left: "49.5vw",
              bottom: 625,
              width: 60,
              height: 60,
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
