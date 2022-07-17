import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { addBooking } from "../../services/bookingService";
import { getRooms } from "../../services/roomService";
import { toast } from "react-toastify";

const StyledButton = styled(Button)({
  marginTop: "40px",
  padding: "15px",
  backgroundColor: "#8C522A",
  color: "#fff",
  width: "80%",
  borderColor: "#8C522A",
  "&:active": {
    backgroundColor: "#8C522A",
  },
  "&:hover": {
    backgroundColor: "#8C522A",
  },
  "&:disabled": {
    backgroundColor: "#dddddd",
  },
});

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data: allRooms } = await getRooms();
      setRooms(allRooms);
    };
    getData();
  }, []);

  const handleBooking = async (room) => {
    try {
      // Change customer ID
      await addBooking({ type: room.type, customerID: "abc" });
      const newRooms = [...rooms];
      const index = newRooms.indexOf(room);
      newRooms[index] = { ...newRooms[index] };
      newRooms[index].available = newRooms[index].available - 1;
      setRooms(newRooms);
      toast.success("Room Booked Successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <React.Fragment>
      {rooms.map((room) => (
        <Container
          key={room.type}
          sx={{
            marginTop: "30px",
            paddingTop: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            paddingBottom: "20px",
            border: "1px solid #8C522A",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                }}
                alt={room.type}
                src={room.image}
              />
            </Grid>
            <Grid item xs={12} md={6} align="center">
              <h1>{room.type}</h1>
              <h4>CA ${room.price} Total</h4>
              <h4 style={{ color: getColor(room.available) }}>
                Available - {room.available}
              </h4>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="h2"
                align="center"
                marginTop="25px"
              >
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "15px",
                  }}
                >
                  {/* Reference: https://mui.com/material-ui/material-icons */}
                  {renderIcon(room.AirConditioning, "Air Conditioning")}
                  {renderIcon(room.FreeWiFi, "Free WiFi")}
                  {renderIcon(room.Bathroom, "Bathroom")}
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "15px",
                  }}
                >
                  {/* Reference: https://mui.com/material-ui/material-icons */}
                  {renderIcon(room.TV, "TV")}
                  {renderIcon(room.DailyHousekeeping, "Daily Housekeeping")}
                  {renderIcon(room.Intercom, "Intercom")}
                </Typography>
              </Typography>
              <StyledButton
                variant="outlined"
                onClick={() => handleBooking(room)}
                disabled={room.available === 0}
              >
                BOOK NOW
              </StyledButton>
            </Grid>
          </Grid>
        </Container>
      ))}
    </React.Fragment>
  );
};

function getColor(available) {
  if (available > 5) return "#1bb369";
  else if (available > 0 && available <= 5) return "#e68927";
  else return "#e62727";
}

const renderIcon = (status, text) => {
  if (status)
    return (
      <>
        <CheckIcon sx={{ display: { md: "flex" }, mr: 1 }} color="success" />
        <Typography variant="div" gutterBottom>
          {text}
        </Typography>
      </>
    );
  else
    return (
      <>
        <CloseIcon sx={{ display: { md: "flex", color: "red" }, mr: 1 }} />
        <Typography variant="div" gutterBottom>
          {text}
        </Typography>
      </>
    );
};

export default Booking;
