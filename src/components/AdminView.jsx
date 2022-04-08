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
  FormHelperText,
} from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminView = ({ type, setBranchs, setVisibility, selectedBranch }) => {
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
    error: "",
    showPassword: false,
    style: { m: 1, width: "25ch" },
  });
  const [hours, setHours] = useState(["00:00"]);

  useEffect(() => {
    const array = [];
    for (let i = 0; i <= 24; i++) {
      if (i < 10) array.push(`0${i}:00`);
      else array.push(`${i}:00`);
    }
    setHours(array);

    if (selectedBranch && selectedBranch[0]) {
      const { name, user, coords, maxPerTurn, turnRange } = selectedBranch[0];
      const editForm = {
        name: name,
        email: user.email,
        password: "",
        coords: coords,
        maxPerTurn: maxPerTurn,
        turnRange: JSON.parse(turnRange),
      };
      setState({ ...state, form: editForm });
    }
  }, []);

  const handleEmptyValue = (form) => {
    setState({ ...state, error: "" });
    const keys = Object.keys(form);
    const values = Object.values(form);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === "") {
        setState({ ...state, error: keys[i] });
        return false;
      }
    }
    if (form.turnRange.open >= form.turnRange.close) {
      setState({ ...state, error: "turnRange" });
      return false;
    }
    if (form.password && form.password.length < 8) {
      setState({ ...state, error: "passwordLength" });
      return false;
    }
    return true;
  };

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
        error: "",
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
        error: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type);
    if (type === "add") {
      handleEmptyValue(state.form);
      if (handleEmptyValue(state.form)) {
        await axios.post("http://localhost:3001/branch/register", state.form);
        const branchs = await axios.get(
          "http://localhost:3001/branch/adminview"
        );
        setBranchs(branchs.data);
        setVisibility(false);
      }
    }
    if (type === "edit") {
      await axios.put(
        `http://localhost:3001/branch/${selectedBranch[0].id}`,
        state.form
      );
      const branchs = await axios.get("http://localhost:3001/branch/adminview");
      setBranchs(branchs.data);
      setVisibility(false);
    }
  };

  return (
    <Box
      display="flex"
      height={780}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        {type === "add" ? (
          <h1>Añadir nueva sucursal</h1>
        ) : (
          <h1>Editar sucursal</h1>
        )}
        <Box
          sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
        >
          <Box>
            <TextField
              sx={state.style}
              error={state.error === "name"}
              label="Nombre"
              name="name"
              value={state.form.name || ""}
              variant="outlined"
              onChange={handleChange}
              helperText={state.error === "name" ? "Respuesta Inválida" : ""}
            ></TextField>
          </Box>
          <Box>
            <FormControl sx={state.style}>
              <InputLabel id="demo-simple-select-label">
                Hora inicial
              </InputLabel>
              <Select
                error={state.error === "turnRange"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="open"
                defaultValue={hours[0]}
                value={hours[state.form.turnRange.open]}
                label="Hora Inicial"
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
              {state.error === "turnRange" ? (
                <FormHelperText error>Franja Horaria Inválida</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
            <FormControl sx={state.style}>
              <InputLabel id="demo-simple-select-label">Hora final</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                error={state.error === "turnRange"}
                id="demo-simple-select"
                name="close"
                defaultValue={hours[0]}
                value={hours[state.form.turnRange.close]}
                label="Hora Final"
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
              {state.error === "turnRange" ? (
                <FormHelperText error>Franja Horaria Inválida</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
          <Box>
            <TextField
              sx={state.style}
              error={state.error === "email"}
              label="Mail"
              value={state.form.email}
              variant="outlined"
              helperText={state.error === "email" ? "Respuesta Inválida" : ""}
              name="email"
              onChange={handleChange}
            ></TextField>

            <FormControl sx={state.style} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={state.showPassword ? "text" : "password"}
                error={state.error === "password"}
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
                label="Contraseña"
              />
              {state.error === "password" ? (
                <FormHelperText error>Respuesta Inválida</FormHelperText>
              ) : (
                <></>
              )}
              {state.error === "passwordLength" ? (
                <FormHelperText error>Mínimo 8 Carácteres</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
          <Box>
            <TextField
              defaultValue={1}
              sx={state.style}
              label="Cantidad de turnos"
              type="number"
              name="maxPerTurn"
              value={state.form.maxPerTurn}
              variant="outlined"
              InputProps={{ inputProps: { min: 1 } }}
              onChange={handleChange}
            ></TextField>
            <TextField
              sx={state.style}
              error={state.error === "coords"}
              label="Coordenadas"
              name="coords"
              variant="outlined"
              defaultValue={"-90.000, -180.0000"}
              value={state.form.coords}
              helperText={state.error === "coords" ? "Respuesta Inválida" : ""}
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
