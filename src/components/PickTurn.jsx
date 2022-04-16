import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

import PickTurnSelect from "./PickTurnSelect";

export default function PickTurn() {
  const { id } = useParams();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha caducado su sesión",
        showConfirmButton: false,
        timer: 3000,
      });
      return <Navigate to="/" />;
    } else {
      return (
        <TextField
          sx={{ width: 220 }}
          id="outlined-read-only-input-time"
          label="Tiempo restante"
          value={minutes + ":" + seconds}
          disabled
          InputProps={{
            readOnly: true,
          }}
        />
      );
    }
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
        <Countdown date={Date.now() + 30000} renderer={renderer} />
      </Grid>

      <PickTurnSelect id={id} />
    </Grid>
  );
}
