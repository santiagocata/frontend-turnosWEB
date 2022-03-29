import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

const AdminView = () => {
  const [state, setState] = useState({
    name: "",
    password: "",
    hours: "",
    turnQuantity: "",
    email: "",
    coordinates: "",
    showPassword: false,
  });
  const [hours, setHours] = useState(["00:00"]);

  useEffect(() => {
    const array = ["00:00"];
    for (let i = 1; i <= 24; i++) {
      array.push(`${i}:00`);
    }
    setHours(array);
  }, []);

  const style = { m: 1, width: "25ch" };

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <Box
      display="flex"
      height={780}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <h1>Añadir nueva sucursal</h1>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
        >
          <Box>
            <TextField
              sx={style}
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
            ></TextField>
          </Box>
          <Box>
            <FormControl sx={style}>
              <InputLabel id="demo-simple-select-label">Start Hour</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="hours"
                defaultValue={hours[0]}
                label="Start Hour"
                onChange={handleChange}
              >
                {hours.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={style}>
              <InputLabel id="demo-simple-select-label">End Hour</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="hours"
                defaultValue={hours[0]}
                label="End Hour"
                onChange={handleChange}
              >
                {hours.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              sx={style}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
            ></TextField>

            <FormControl sx={style} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={state.showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Box>
            <TextField
              sx={style}
              label="Quantity"
              type="number"
              name="turnQuantity"
              variant="outlined"
              onChange={handleChange}
            ></TextField>
            <TextField
              sx={style}
              label="Coordinates"
              name="coordinates"
              variant="outlined"
              onChange={handleChange}
            ></TextField>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminView;
