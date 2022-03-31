import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useState } from "react";

function BranchList() {
  const [branchs, setBranchs] = useState([
    { id: 1, name: "Branch1", logo: "", description: "Branch1" },
    { id: 2, name: "Branch2", logo: "", description: "Branch2" },
    { id: 3, name: "Branch3", logo: "", description: "Branch3" },
    { id: 4, name: "Branch4", logo: "", description: "Branch4" },
  ]);

  const deleteBranch = (id) => {
    const newBranchs = branchs.filter((row) => row.id !== id);
    setBranchs(newBranchs);
  };

  const columns = [
    {
      field: "logo",
      headerName: "Logo",
      width: 140,
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 539 },
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
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <h1 style={{ marginBottom: "42px", marginTop: "42px" }}>Sucursales</h1>
      <Box width="50%" height={580} marginBottom={8}>
        <DataGrid columns={columns} rows={branchs}></DataGrid>
      </Box>
    </Box>
  );
}

export default BranchList;
