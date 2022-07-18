import React from 'react'
import { Box, AppBar, Toolbar, Button } from '@mui/material/'
import TourRequest from '../services/TourRequest'
import { useNavigate } from "react-router-dom";



function Navbar() {

  let navigate = useNavigate();
  const redirecToLogin = () => {
    console.log("Hello");
    navigate("../login");
  }

  const logout = () => {
    localStorage.setItem("group29_logged_in", false);
    navigate("../login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Button style={{ minWidth: '20px' }} color='inherit'>
            Muir
          </Button>
          <TourRequest />

          {localStorage.getItem("group29_logged_in") == "true" ? (<Button onClick={logout} style={{ minWidth: '20px' }} color='inherit'>
            Logout
          </Button>) : (<Button onClick={redirecToLogin} style={{ minWidth: '20px' }} color='inherit'>
            Login
          </Button>)}

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
