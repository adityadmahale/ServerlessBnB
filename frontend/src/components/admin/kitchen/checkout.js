import { Box, Button, styled } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { checkout } from "../../../services/checkoutService";

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
  const handleCheckout = async () => {
    try {
      // Change customer ID
      await checkout({ type: "Standard", customerID: "abc" });

      toast.success("Checkout Successful");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Something went wrong");
      }
    }
  };

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
      <StyledButton variant="outlined" onClick={handleCheckout}>
        Checkout
      </StyledButton>
    </Box>
  );
};

export default Home;
