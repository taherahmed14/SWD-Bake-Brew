import React, { useState } from "react";
import { Button } from "@mui/material"
import Navbar from "../Navbar"
import { useNavigate } from "react-router-dom";

export const Acknowledge = () => {
    const navigate = useNavigate();
    const [cartItems] = useState(() => {
        let items = [];
        if (typeof window !== "undefined" && window.sessionStorage) {
          items = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
        }
        return items;
    });

    const navigateToShop = () => {
        navigate("/shop")
    }

    return(
        <>
            <Navbar cartItems={cartItems} />
            <div className="ack_container">
                <h2>Your order has been placed successfully.</h2>
                <Button onClick={navigateToShop}>
                    Continue Shopping
                </Button>
            </div>
        </>
    )
}