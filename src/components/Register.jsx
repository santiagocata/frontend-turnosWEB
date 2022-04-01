import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const { register, handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.role = "client";
    
    axios
    .post("/user/register", data)
    .then((data) => navigate("/login"))
    .catch((err) => {
      setEmailErrorMsg(true);
    });
  };
  
  
  const [emailErrorMsg, setEmailErrorMsg] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    /* if (reason === "clickaway") {
      /// Esta función permite que no se elimine la alerta al hacer click en cualquier parte
      return;
    } */
    setEmailErrorMsg(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={emailErrorMsg}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            ¡El email ingresado ya se encuentra registrado!
          </Alert>
        </Snackbar>
      </Stack>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...register("name", {
                        pattern: {
                          value:
                            /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                          message: "Ingrese caracteres válidos",
                        },
                      })}
                      label="Nombre *"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="name"
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Campo requerido",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastname"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...register("lastname", {
                        pattern: {
                          value:
                            /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                          message: "Ingrese caracteres válidos",
                        },
                      })}
                      label="Apellido"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="name"
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Campo requerido",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Ingrese un email valido",
                        },
                      })}
                      label="Email *"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="email"
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Campo requerido",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="dni"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...register("dni", {
                        minLength: {
                          value: 8,
                          message: "Ingrese un DNI de 8 caracteres",
                        },
                        maxLength: {
                          value: 8,
                          message: "Ingrese un DNI de 8 caracteres",
                        },
                      })}
                      label="DNI*"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="number"
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Campo requerido",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...register("password", {
                        // pattern: {
                        //   value:
                        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                        //   message: "Ingrese contraseña  valida",
                        // },
                        minLength: {
                          value: 8,
                          message: "Contraseña mínimo 8 caracteres",
                        },
                      })}
                      label="Contraseña *"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="password"
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Campo requerido",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Cuenta
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Ya tienes cuenta? Inicia Sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
