import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const Review = () => {
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
      <div className="pagenotfound"> 
        <h2>This page is under construction. Please visit later.</h2>
      </div>
    </div>
  );
};

export default Review;
