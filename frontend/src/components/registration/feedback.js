import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  Container,
  styled,
  TextField
} from "@mui/material/";
import axios from "axios";
import { toast } from "react-toastify";
import { db } from "./firebase.config";

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

function Feedbacks() {
  const [name, setName] = useState("");
  const [newFeedback, setNewFeedback] = useState("");
  const sentimentCollectionRef = db.collection("sentiment")

  const [feedbacks, setFeedbacks] = useState([]);
  const feedbackCollectionRef = db.collection("feedback")

  const addFeedback = async () => {
    await feedbackCollectionRef.add({name:name, feedback:newFeedback})
    toast.success("Feedback added successfuly");

  }
  
  useEffect(() =>{
    const getFeedbacks = async () => {
      const data = await sentimentCollectionRef.get()
      setFeedbacks(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

    }
    getFeedbacks()
  }, [])

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
        Enter your Feedback
      </Typography>
      <form>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="newFeedback"
                  name="newFeedback"
                  label="Add Feedback"
                  fullWidth
                  onChange={(e) => setNewFeedback(e.target.value)}
                />
              </Grid>
              <StyledButton
                fullWidth
                onClick = {addFeedback}
                
            >
                Post Feedback
            </StyledButton>
            </Grid>
        </form>

        <br />

        <Typography
        variant="h6"
        component="div"
        color={"black "}
        fontWeight={"bolder"}
        marginBottom="10px"
        sx={{ flexGrow: 1 }}
        style={{ marginTop: 20 }}
      >
        Feedbacks
      </Typography>

      {feedbacks.map((feedback) => {
      return (
        <div>
          {" "}
          <h3>Name : {feedback.name}</h3>
          <h3>Feedback : {feedback.feedback}</h3>
          <h3>Sentiment Score : {feedback.sentimentscore}</h3>
          <h3>Sentiment Magnitude : {feedback.sentimentmagnitude}</h3>
          <h3>Polarity : {feedback.polarity}</h3>
          <br />
          </div>
      );
    })}
 
      
    </Container>
    
  );
}

export default Feedbacks;
