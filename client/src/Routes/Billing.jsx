import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BillingAddress from "../Components/PaymentAndABillingCompoennt/BillingAddress";
const Billing = () => {
  return (
    <>
      <Navbar />
      <BillingAddress />
      {/* <Footer /> */}
    </>
  );
};

export default Billing;
