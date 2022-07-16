import React from "react";
import { Box, AppBar, Toolbar, Button } from "@mui/material/";

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button style={{ minWidth: "20px" }} color="inherit">
            Muir
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
