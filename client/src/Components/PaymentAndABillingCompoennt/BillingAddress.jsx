import { Button, Divider, TextField } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import CartItemComponent from "../ShippingComponent/CartItemComponent";
import "./BillingAddress.css";

const BillingAddress = () => {
  return (
    <>
      <div className="ship_main_div-bill">
        <div className="ship_left_div">
          <div className="shiping_form_div">
            <div className="contactAddress">
              <div className="contactEmail">
                <div className="addressHeading">Contact</div>
                <div className="addressEmail">Xyz@gmail.com</div>
                <NavLink to="/ship">
                  <div className="addressChange">Change</div>
                </NavLink>
              </div>
              <Divider />
              <div className="contactEmail">
                <div className="addressHeading">Ship To</div>
                <div className="addressEmail">
                  sdahflkasdjhf ldshf kjhsadfjklhsdf fhldsafjhjlksdaf lf hsdahj
                </div>
                <NavLink to="/ship">
                  <div className="addressChange">Change</div>
                </NavLink>
              </div>
            </div>
            <div className="bot_button">
              <NavLink style={{ textDecoration: "none" }} to="/payment">
                <Button
                  style={{
                    backgroundColor: "black",
                    border: "1px solid gray",
                    fontSize: "12px",
                    color: "white",
                    // margin: "auto",
                  }}
                  variant="outlined"
                >
                  Pay Now
                </Button>
              </NavLink>
              <NavLink style={{ textDecoration: "none" }} to="/cart">
                <Button
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    fontSize: "12px",
                    color: "grey",
                  }}
                  variant="outlined"
                >
                  Return To Cart
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
        <CartItemComponent />
      </div>
    </>
  );
};

export default BillingAddress;
