import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { LogContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

const pages = ["Products", "Pricing", "Blog"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logOut } = useContext(LogContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    user?.role == "operator"
      ? { to: "turn", text: "Panel Turnos" }
      : user?.role == "admin"
      ? { to: "adminlist", text: "Panel de sucursales" }
      : { to: "myturn", text: "Mi Turno" },
    { to: "changepassword", text: "Cambiar Contraseña" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "lightgrey" }}>
      <CssBaseline />

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/">
              <img
                src={require("../assets/turnosWEB-logos_blackblue.png")}
                height={"50px"}
                width={"auto"}
              />
            </Link>
          </Typography>
          {/* 
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
                {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} 
            </Menu>
          </Box> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/">
              <img
                src={require("../assets/turnosWEB-logos_white.png")}
                height={"50px"}
                width={"auto"}
              />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          {user?.id ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{user.name.charAt(0)}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <Link
                    key={i}
                    to={`${setting.to}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <MenuItem key={i} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </MenuItem>
                  </Link>
                ))}

                <Link
                  to={""}
                  style={{ color: "inherit", textDecoration: "none" }}
                  onClick={() => logOut()}
                >
                  <MenuItem key={5} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Cerrar Sesión</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          ) : (
            ""
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
