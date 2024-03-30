import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "./BillingAddress.css";
import VerticalTabs from "./VerticalTabs";

const PaymentPage = () => {
  return (
    <>
      <Navbar />
      <div className="paymentLayout">
        <div className="Tab_div">
          <VerticalTabs />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
