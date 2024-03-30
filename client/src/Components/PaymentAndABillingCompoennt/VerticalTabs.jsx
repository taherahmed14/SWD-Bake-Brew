import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./BillingAddress.css";
import { Button, TextField } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "fitContent",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Debit/Credit Card" {...a11yProps(0)} />
        <Tab label="UPI" {...a11yProps(1)} />
        <Tab label="Wallets" {...a11yProps(2)} />
        <Tab label="Net Banking" {...a11yProps(3)} />
        <Tab label="Cash On Delivery" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ width: "100%" }}>
        <div className="card_div">
          <TextField
            id="standard-card-number-input"
            label="Card Number"
            type="text"
            required={true}
            inputProps={{ maxLength: 16 }}
            // autoComplete="current-password"
            variant="standard"
            style={{
              // backgroundColor: "blue"
              width: "80%",
              marginBottom: "0.5px",
            }}
          />
          <TextField
            id="standard-card-holder-name-input"
            label="Card Holder Name"
            type="text"
            required={true}
            // autoComplete="current-password"
            variant="standard"
            style={{
              // backgroundColor: "blue"
              width: "80%",
              marginBottom: "0.5px",
            }}
          />
          <div className="cvv">
            <TextField
              id="standard-card-cvv"
              label="CVV"
              type="text"
              required={true}
              placeholder="000"
              // autoComplete="current-password"
              variant="standard"
              inputProps={{ maxLength: 3 }}
              style={{
                // backgroundColor: "blue"
                width: "36%",
                marginBottom: "0.5px",
                justifyContent: "left",
                marginLeft: "12%",
              }}
            />
            <TextField
              id="standard-card-cvv"
              label="Expiry Date"
              type="text"
              required={true}
              // autoComplete="current-password"
              variant="standard"
              placeholder="MM/YY"
              // inputProps={{ maxLength: 3 }}
              style={{
                // backgroundColor: "blue"
                width: "36%",
                marginBottom: "0.5px",
                justifyContent: "left",
                marginLeft: "12%",
              }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "black",
              border: "1px solid gray",
              fontSize: "12px",
              color: "white",
              margin: "1rem",
            }}
            variant="outlined"
          >
            Pay Now
          </Button>
        </div>
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{ border: "1px solid red", width: "100%" }}
      >
        <div>
          <TextField
            id="standard-card-cvv"
            label="Enter Upi ID"
            type="text"
            required={true}
            // autoComplete="current-password"
            variant="standard"
            // inputProps={{ maxLength: 3 }}
            style={{
              // backgroundColor: "blue"
              width: "36%",
              marginBottom: "0.5px",
              justifyContent: "left",
              marginLeft: "12%",
            }}
          />
        </div>
        <Button
          style={{
            backgroundColor: "black",
            border: "1px solid gray",
            fontSize: "12px",
            color: "white",
            margin: "1rem",
          }}
          variant="outlined"
        >
          Verify and Pay
        </Button>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        style={{ border: "1px solid red", width: "100%" }}
      >
        Item Three
      </TabPanel>
      <TabPanel
        style={{ border: "1px solid red", width: "100%" }}
        value={value}
        index={3}
      >
        Item Four
      </TabPanel>
      <TabPanel
        style={{ border: "1px solid red", width: "100%" }}
        value={value}
        index={4}
      >
        <p>Cash On Delivery Not available at for this product </p>
      </TabPanel>
    </Box>
  );
}
