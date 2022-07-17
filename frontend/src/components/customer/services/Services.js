import React, { useState, useEffect, useMemo } from "react";
import { Typography, Button, Grid, Select, MenuItem } from "@mui/material/";
import axios from "axios";

function Services() {
  const [foodOrdered, setFoodOrdered] = useState(false);
  const [foodOptions, setFoodOptions] = useState([
    {
      foodItem: "",
      price: 10,
    },
  ]);
  const [selectedFoodOption, setSelectedFoodOption] = useState("Poha");
  const [selectedFoodPrice, setSelectedFoodPrice] = useState(10);
  //useEffect(() => {}, [foodOrdered]);
  useEffect(() => {
    axios("https://kitchen-service-kc2rqvhqga-uc.a.run.app/getFoodItems").then(
      (res) => {
        console.log(res.data);
        setFoodOptions(res.data);
      }
    );
    setSelectedFoodOption(foodOptions[0].foodItem);
    setSelectedFoodPrice(foodOptions[0].price);
  }, []);

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
        order: selectedFoodOption,
        price: selectedFoodPrice,
      },
    };
    axios(options).then((res) => {
      console.log(res);
      setFoodOrdered(true);
    });
  }

  const handleChange = (e) => {
    setSelectedFoodOption(e.target.name);
    setSelectedFoodPrice(e.target.value);
  };

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
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography
            variant="body1"
            component="div"
            color={"black "}
            fontWeight={"bolder"}
            sx={{ flexGrow: 1 }}
            style={{ marginLeft: 20, marginTop: 20 }}
          >
            Food options
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Select
            name={selectedFoodOption}
            value={selectedFoodPrice}
            onChange={handleChange}
          >
            {foodOptions?.map((option) => {
              return (
                <MenuItem key={option.value} value={option.price}>
                  {option.foodItem}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="body1"
            component="div"
            color={"black "}
            fontWeight={"bolder"}
            sx={{ flexGrow: 1 }}
            style={{ marginLeft: 20, marginTop: 20 }}
          >
            Price: {selectedFoodPrice}
          </Typography>
        </Grid>
      </Grid>
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
    </>
  );
}

export default Services;
