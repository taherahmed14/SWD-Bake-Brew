import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "5px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalMui = ({ handleClose, handleOpen, open, onSubmit }) => {
  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Cart Review
            </Typography>

            <Typography
              id="transition-modal-title"
              style={{ marginTop: "1rem", fontSize: "16px" }}
              variant="h6"
              component="h2"
            >
              Your order is prepared for delivery. Before making a payment, kindly verify your shipping information.
            </Typography>

            <Button
              style={{
                backgroundColor: "black",
                border: "1px solid gray",
                fontSize: "14px",
                color: "white",
                marginTop: "2rem",
              }}
              variant="outlined"
              onClick={onSubmit}
              type="submit"
            >
              Proceed to payment
            </Button>
            <Button
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                fontSize: "14px",
                color: "grey",
                marginTop: "2rem",
                marginLeft: "2rem",
              }}
              variant="outlined"
              onClick={handleClose}
            >
              Verify Shipping
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalMui;
