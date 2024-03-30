import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ShippingLayout from "../Components/ShippingComponent/ShippingLayout";

export const Shipping = () => {
  const Navigate = useNavigate();
  const [cartItems] = useState(() => {
    let items = [];
    if (typeof window !== "undefined" && window.sessionStorage) {
      items = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    }
    return items;
  });
  useEffect(() => {
    if (cartItems.length === 0) {
      Navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar cartItems={cartItems} />
      <ShippingLayout cartItems={cartItems} />
      {/* <Footer /> */}
    </div>
  );
};
