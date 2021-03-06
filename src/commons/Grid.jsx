import { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ResponsiveCard from "./Card";
import axios from "axios";

export default function ResponsiveGrid() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios.get("/branch/all").then((branch) => {
      setBranches(branch.data);
    });
  }, []);

  return (
    <Box sx={{ m: 2, flexGrow: 1 }}>
      <Grid
        container
        direction={{ xs: "column", sm: "row", md: "row" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 12, md: 16 }}
        justifyContent="center"
        display="flex"
      >
        {branches?.map((branch, i) => (
          <Grid item xs={1} sm={4} md={4} key={i}>
            <ResponsiveCard branch={branch} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
