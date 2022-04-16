import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import { useParams } from "react-router";

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
        turnosWEB
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SetNewPassword() {
  const { token } = useParams();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`/user/password/reset/${token}`, data)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Su contraseña se ha modificado",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => setEmailErrorMsg(true));
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
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            ¡El token se encuentra vencido o es incorrecto!
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
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            {/*  <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingrese su nueva contraseña
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
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
                  })}
                  label="Contraseña *"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="password"
                  fullWidth
                  sx={{ mt: 1 }}
                />
              )}
              rules={{
                required: "Campo requerido",
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              CONFIRMAR
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
