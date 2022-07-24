import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import TourRequest from "../../tourRequest/TourRequest";

import { useNavigate } from "react-router-dom";

const pages = ["Booking"];
const authPages = [
  "Booking",
  "Checkout",
  "Services",
  "Feedback",
  "Visualizations",
];
const settings = ["Logout"];

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isLoggedIn = () => {
    return (
      localStorage.getItem("group29_logged_in") !== null &&
      localStorage.getItem("group29_logged_in") === "true"
    );
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === "Booking") {
      navigate("/booking");
    } else if (page === "Checkout") {
      navigate("/checkout");
    } else if (page === "Services") {
      navigate("/services");
    } else if (page === "Feedback") {
      navigate("/feedback");
    } else if (page === "Visualizations") {
      navigate("/visualizations");
    }
  };

  const redirecToLogin = () => {
    console.log("Hello");
    navigate("../login");
  };

  const logout = () => {
    localStorage.setItem("group29_logged_in", false);
    navigate("../login");
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
  };

  const navigateFromMenu = (setting) => {
    if (setting === "Logout") {
      navigate("/");
    }
  };

  const renderLinks = () => {
    const links = isLoggedIn() ? authPages : pages;
    return links.map((page) => (
      <MenuItem
        key={page}
        onClick={() => {
          handleCloseNavMenu(page);
        }}
      >
        <Typography textAlign="center">{page}</Typography>
      </MenuItem>
    ));
  };

  const renderLinksOnSmallScreens = () => {
    const links = isLoggedIn() ? authPages : pages;
    return links.map((page) => (
      <Button
        key={page}
        onClick={() => {
          handleCloseNavMenu(page);
        }}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {page}
      </Button>
    ));
  };

  return (
    <AppBar sx={{ bgcolor: "#8C522A" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ServerlessBnB
          </Typography>

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
              {renderLinks()}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ServerlessBnB
          </Typography>
          {isLoggedIn() && <TourRequest />}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* TODO add necessary page menu options */}
            {renderLinksOnSmallScreens()}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title='Profile'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Tooltip> */}
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    navigateFromMenu(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {localStorage.getItem("group29_logged_in") == "true" ? (
            <Button
              onClick={logout}
              style={{ minWidth: "20px" }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={redirecToLogin}
              style={{ minWidth: "20px" }}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
