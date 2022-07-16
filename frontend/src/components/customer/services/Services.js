import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material/";
import axios from "axios";

function Services() {
  const [foodOrdered, setFoodOrdered] = useState(false);
  useEffect(() => {}, [foodOrdered]);

  function placeOrder() {
    const options = {
      method: "post",
      url: "https://kitchen-service-kc2rqvhqga-uc.a.run.app/placeorder",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
      data: {
        customerId: "56789",
        order: "Breakfast",
      },
    };
    axios(options).then((res) => {
      console.log(res);
      setFoodOrdered(true);
    });
  }
  return (
    <>
      <Typography
        variant="h6"
        component="div"
        color={"black "}
        fontWeight={"bolder"}
        sx={{ flexGrow: 1 }}
        style={{ marginLeft: 20, marginTop: 20 }}
      >
        Services
      </Typography>
      <Button
        variant="outlined"
        style={{ marginLeft: 20, marginTop: 20 }}
        onClick={(event) => {
          if (event !== null) {
            let currentHrs = new Date().getHours();
            console.log(currentHrs);
            if (!(currentHrs < 6 || currentHrs > 11)) {
              alert("Breakfast can only be ordered between 6 AM to 11 AM.");
            } else {
              if (foodOrdered) {
                alert("Breakfast already ordered.");
              } else {
                placeOrder();
                alert("Breakfast ordered.");
              }
            }
          }
        }}
      >
        Order breakfast
      </Button>
      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid item lg={2}></Grid>
        <Grid item lg={5} xs={12}>
          <Typography
            variant="h6"
            component="div"
            color={"black "}
            fontWeight={"bolder"}
            sx={{ flexGrow: 1 }}
            style={{ marginBottom: 10 }}
          >
            Services
          </Typography>
        </Grid>
        <Grid item lg={5}></Grid>
        <Grid item lg={3} md={4} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              disableFuture
              label="Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={startDate}
              onChange={async (event) => {
                if (event !== null) {
                  let currentHrs = new Date(event).getHours();
                  console.log(currentHrs);
                  if (currentHrs < 6 || currentHrs > 11) {
                    alert("Breakfast can be ordered between 6 AM to 11 AM.");
                  } else {
                    setStartDate(event);
                  }
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Box> */}
    </>
  );
}

export default Services;
