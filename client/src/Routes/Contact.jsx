import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact = () => {
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

      <div className="contactus">
        <h2>Contact Us</h2>
        <p>For Bulk orders, dealership or purchase related queries, contact us at,</p>
        <div className="contactDetails">
          <i className="fa fa-home home1">
              <span>
                NO 135,1st floor Lakshmi nagar,Mudichur main
                road,Mudichur,Chennai-600048
              </span>
          </i>
          <br />
          <i className="fa fa-phone phone1">
            <span>+91-8668049044</span>
          </i>
          <br />
          <i className="fa fa-envelope-o envelope2">
            <span>alphaenterprises2k18@gmail.com</span>
          </i>
          <br />
          <i className="fa fa-whatsapp fa-whatsapp1">
            <span>+91-8668049044</span>
          </i>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
