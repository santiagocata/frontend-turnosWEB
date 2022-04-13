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
      maxPerTurn: 1,
      turnRange: {
        open: 0,
        close: 0,
      },
    },
    location: {
      country: "",
      city: "",
      localty: "",
      adress: "",
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
      setState({ ...state, form: editForm, location: setLocation() });
    }
  }, []);

  const createTextField = (name, label, location = false) => {
    let value = state.form[name];
    let change = handleChange;
    if (location) {
      value = state.location[name];
      change = (e) => handleChange(e, undefined, true);
    }
    return (
      <TextField
        sx={state.style}
        error={state.error === name}
        label={label}
        name={name}
        value={value || ""}
        variant="outlined"
        onChange={change}
        helperText={state.error === name ? "Respuesta Inválida" : ""}
      ></TextField>
    );
  };

  const createButtons = (names, labels, location = false) => {
    return (
      <Box>
        {createTextField(names[0], labels[0], location)}
        {createTextField(names[1], labels[1], location)}
      </Box>
    );
  };

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
    if (form.turnRange && form.turnRange.open >= form.turnRange.close) {
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

  const handleChange = (e, turnRange, location = false) => {
    if (turnRange === undefined) {
      !location
        ? setState({
            ...state,
            form: { ...state.form, [e.target.name]: e.target.value },
            error: "",
          })
        : setState({
            ...state,
            location: {
              ...state.location,
              [e.target.name]: e.target.value,
            },
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

  const unifyStrings = (...strings) => {
    let response = "";
    for (let i = 0; i < strings.length; i++) {
      for (let j = 0; j < strings[i].length; j++) {
        if (strings[i][j] === " ") {
          response += "+";
          continue;
        }
        response += strings[i][j];
      }
      response += ",";
    }
    return response;
  };

  const setCoords = () => {
    const { adress, city, country, localty } = state.location;
    setState({
      ...state,
      form: {
        ...state.form,
        coords: unifyStrings(adress, localty, city, country),
      },
    });
    return unifyStrings(adress, localty, city, country);
  };

  const setLocation = () => {
    const string = selectedBranch[0].coords;
    const keys = ["adress", "localty", "city", "country"];
    let check = 0;
    const location = {
      country: "",
      city: "",
      localty: "",
      adress: "",
    };
    for (let i = 0; i < string.length; i++) {
      if (string[i] === ",") {
        check++;
        continue;
      }
      if (string[i] === "+") {
        location[keys[check]] += " ";
        continue;
      }
      location[keys[check]] += string[i];
    }
    return location;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "add") {
      const form = state.form;
      form.coords = setCoords();
      handleEmptyValue(form);
      handleEmptyValue(state.location);
      if (handleEmptyValue(state.form) && handleEmptyValue(state.location)) {
        await axios.post("/branch/register", form);
        const branchs = await axios.get("/branch/adminview");
        setBranchs(branchs.data);
        setVisibility(false);
      }
    }
    if (type === "edit") {
      const form = state.form;
      form.coords = setCoords();
      await axios.put(`/branch/${selectedBranch[0].id}`, form);
      const branchs = await axios.get("/branch/adminview");
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
      sx={{ marginTop: "5vh" }}
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
          {createTextField("name", "Nombre")}
          {type === "add" ? (
            <Box>
              {createTextField("email", "Mail")}
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
                        {state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
          ) : (
            <></>
          )}
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
          {createButtons(["country", "city"], ["País", "Ciudad"], true)}
          {createButtons(
            ["localty", "adress"],
            ["Localidad", "Dirección"],
            true
          )}
          <Box sx={{ display: "flex" }}>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              label="Cantidad de turnos"
              type="number"
              name="maxPerTurn"
              value={state.form.maxPerTurn}
              variant="outlined"
              InputProps={{ inputProps: { min: 1 } }}
              onChange={handleChange}
            ></TextField>
            <Button sx={state.style} onClick={setCoords}>
              Probar Dirección
            </Button>
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
      <iframe
        width="700vw"
        height="420vh"
        frameBorder="0"
        style={{ border: 0, marginLeft: "10vw", marginTop: "1vh" }}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBfDTDBgoklx7Q1VwUL9_WxJzc69I6BNhI&q=${
          state.form.coords || "Nolocation"
        }`}
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default AdminView;
