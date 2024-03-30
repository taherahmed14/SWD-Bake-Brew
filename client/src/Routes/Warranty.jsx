import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import WarrantyLayout from "../Components/WarrantyComponent/WarrantyLayout";

const Warranty = () => {
  const [cartItems] = useState(() => {
    let items = [];
    if (typeof window !== "undefined" && window.sessionStorage) {
      items = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    }
    return items;
  });
  return (
    <div>
      <Navbar cartItems={cartItems} />
      <WarrantyLayout />
      <Footer />
    </div>
  );
};

export default Warranty;
