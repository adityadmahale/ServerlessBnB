import { Box, Button, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)({
  marginTop: "40px",
  padding: "15px",
  backgroundColor: "#fff",
  maxWidth: "300px",
  fontSize: "25px",
  fontWeight: "bold",
  color: "#8C522A",
  width: "80%",
  borderColor: "#8C522A",
  "&:active": {
    backgroundColor: "#fff",
    color: "#8C522A",
  },
  "&:hover": {
    backgroundColor: "#fff",
    color: "#8C522A",
  },
});

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "90vh",
        backgroundImage: `url('/back.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "0.8",
      }}
    >
      {" "}
      <StyledButton variant="outlined" onClick={() => navigate("/booking")}>
        Get Started
      </StyledButton>
    </Box>
  );
};

export default Home;
