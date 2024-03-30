import { Button, Grid } from "@mui/material";
import React from "react";
import CartCard from "./CartCard";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./CartLayout.css";
import NoItemCart from "../CommonComponents/NoCartItem";

const CartLayout = ({ data, handleDelete, changeQuantity }) => {
  console.log("data::: ", data);
  return (
    <div className="cartpage_div">
      <div className="cart_top_div">
        <div className="yourCart">Your Cart</div>
      </div>
      {data.lenght === 0 ? (
        <NoItemCart />
      ) : (
        <CartCard
          changeQuantity={changeQuantity}
          data={data}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CartLayout;
