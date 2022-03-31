import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function GridTurns() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 50,
    maxColumns: 10,
  });
  console.log(data);

  const [pageSize, setPageSize] = React.useState(25);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
        {...data}
      />
    </div>
  );
}
