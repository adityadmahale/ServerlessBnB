import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  styled,
} from "@mui/material";

import httpClient from "../../../utils/httpClient";

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

function TourRequest() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [stayDuration, setStayDuration] = useState(0);

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "10px",
    boxShadow: 15,
    p: 4,
    width: "40%",
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const recipientEmail = "sc529025@dal.ca";
    const { data } = await httpClient.post(
      "/requestTour",
      { stayDuration, recipientEmail },
      { headers: { "Access-Control-Allow-Origin": true } }
    );
    const { success, tourPackages } = data;
    if (success) {
      console.log(tourPackages);
      setStayDuration(0);
      handleClose();
    }
  };

  return (
    <div>
      <Button style={{ minWidth: "20px" }} color="inherit" onClick={handleOpen}>
        Request Tour
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Request Tour
          </Typography>

          <form onSubmit={onSubmit}>
            <Box my={2}>
              <TextField
                type="number"
                label="Stay Duration in Days"
                fullWidth
                variant="standard"
                onChange={(e) => setStayDuration(e.target.value)}
                name="stayDuration"
                value={stayDuration}
              />
            </Box>

            <Box my={2}>
              <StyledButton fullWidth variant="contained" type="submit">
                Request
              </StyledButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default TourRequest;
