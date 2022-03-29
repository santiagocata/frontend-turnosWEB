import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ResponsiveCard from "./Card";

export default function ResponsiveGrid() {
  return (
    <Box sx={{ m: 2, flexGrow: 1 }}>
      <Grid
        container
        direction={{ xs: "column", sm: "row", md: "row" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 12, md: 16 }}
      >
        {Array.from(Array(12)).map((_, index) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <ResponsiveCard id={index} image={`https://picsum.photos/200/30${index}`}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
