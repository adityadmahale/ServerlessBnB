/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  Container,
  styled,
} from "@mui/material/";
import axios from "axios";
import { toast } from "react-toastify";

const StyledButton = styled(Button)({
  marginTop: "40px",
  padding: "15px",
  backgroundColor: "#8C522A",
  color: "#fff",
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

function Services() {
  const initialFoodOption = {
    foodItem: "Poha",
    price: 10,
  };
  const [foodOrdered, setFoodOrdered] = useState(false);
  const [foodOptions, setFoodOptions] = useState([initialFoodOption]);
  const [selectedFood, setSelectedFood] = useState(initialFoodOption);

  useEffect(() => {
    axios("https://kitchen-service-kc2rqvhqga-uc.a.run.app/getFoodItems").then(
      (res) => {
        setFoodOptions(res.data);
        console.log(res.data);
      }
    );
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
        email: "udit.gandhi@dal.ca",
        order: selectedFood.foodItem,
        price: selectedFood.price,
      },
    };
    axios(options).then((res) => {
      console.log(res);
      setFoodOrdered(true);
    });
  }

  return (
    <Container
      sx={{
        marginTop: "30px",
        paddingTop: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        paddingBottom: "20px",
        border: "1px solid #8C522A",
        width: "60%",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        color={"black "}
        fontWeight={"bolder"}
        marginBottom="10px"
        sx={{ flexGrow: 1 }}
        style={{ marginTop: 20 }}
      >
        Order Breakfast
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Select
            fullWidth
            defaultValue={initialFoodOption.foodItem}
            onChange={(e) => {
              console.log(e.target);
              const filteredOption = foodOptions.filter(
                (option) => option.foodItem === e.target.value
              )[0];
              console.log(filteredOption);
              setSelectedFood(filteredOption);
            }}
          >
            {foodOptions?.map((option) => {
              return (
                <MenuItem value={option.foodItem}>{option.foodItem}</MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography
            variant="body1"
            component="div"
            color={"black"}
            sx={{ flexGrow: 1 }}
            style={{
              backgroundColor: "#8C522A",
              borderRadius: "5px",
              padding: "15px",
              color: "#fff",
              fontWeight: "bolder",
              fontSize: "18px",
            }}
          >
            $ {selectedFood.price}
          </Typography>
        </Grid>
      </Grid>
      <StyledButton
        fullWidth
        onClick={(event) => {
          if (event !== null) {
            let currentHrs = new Date().getHours();
            console.log("currentHrs" + currentHrs);
            if (!(currentHrs < 6 || currentHrs > 11)) {
              toast.error(
                "Breakfast can only be ordered between 6 AM to 11 AM."
              );
            } else {
              if (foodOrdered) {
                toast.error("Breakfast already ordered.");
              } else {
                placeOrder();
                toast.success("Breakfast ordered.");
              }
            }
          }
        }}
      >
        Order breakfast
      </StyledButton>
    </Container>
  );
}

export default Services;
