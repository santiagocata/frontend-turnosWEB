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
import axios from "axios";

const AdminView = ({ setBranchs, visibility, setVisibility }) => {
  const [state, setState] = useState({
    form: {
      name: "",
      email: "",
      password: "",
      coords: "",
      maxPerTurn: 0,
      turnRange: {
        open: 0,
        close: 0,
      },
    },
    showPassword: false,
  });
  const [hours, setHours] = useState(["00:00"]);

  useEffect(() => {
    const array = ["00:00"];
    for (let i = 1; i <= 24; i++) {
      if (i < 10) array.push(`0${i}:00`);
      else array.push(`${i}:00`);
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

  const handleChange = (e, turnRange) => {
    if (turnRange === undefined) {
      setState({
        ...state,
        form: { ...state.form, [e.target.name]: e.target.value },
      });
    } else {
      let hour = e.target.value[0] + e.target.value[1];
      if (hour[0] === "0") hour = hour[1];
      setState({
        ...state,
        form: {
          ...state.form,
          turnRange: {
            ...state.form.turnRange,
            [e.target.name]: parseInt(hour),
          },
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state.form);
    await axios.post("http://localhost:3001/branch/register", state.form);
    const branchs = await axios.get("http://localhost:3001/branch/adminview");
    setBranchs(branchs.data);
    setVisibility(!visibility);
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
                name="open"
                defaultValue={hours[0]}
                label="Start Hour"
                onChange={(e) => handleChange(e, "turnRange")}
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
                name="close"
                defaultValue={hours[0]}
                label="End Hour"
                onChange={(e) => handleChange(e, "turnRange")}
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
              name="maxPerTurn"
              variant="outlined"
              onChange={handleChange}
            ></TextField>
            <TextField
              sx={style}
              label="Coordinates"
              name="coords"
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
