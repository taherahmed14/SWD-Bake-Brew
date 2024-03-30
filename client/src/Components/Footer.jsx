import React from "react";
import "./Footer.modules.css";
import logo from "../Assets/logo.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="details">
        <div className="innerDiv">
          <div className="Footerinner">
            <div>
              <img className="log" src={logo} alt="logo" />
            </div>
            <div>
              <p>About the Nextron company and products</p>
            </div>
          </div>
        </div>
        <div className="innerDiv">
          <h3 className="footer_heading">Services</h3>
          <p>Product Registration</p>
          <p>Terms of Services</p>
          <p>Register Complaint</p>
          <p>Distributor Enquiry</p>
          <p>Refund Policy</p>
          <p>Terms and Conditions</p>
        </div>
        <div className="innerDiv_add">
          <h3 className="footer_heading">Contact Us</h3>
          <i className="fa fa-home home1">
            <span>
              NO 135,1st floor Lakshmi nagar,Mudichur main
              road,Mudichur,Chennai-600048
            </span>
          </i>
          <i className="fa fa-phone phone1">
            <span>+91-8668049044</span>
          </i>
          <i className="fa fa-envelope-o envelope2">
            <span>alphaenterprises2k18@gmail.com</span>
          </i>
          <i className="fa fa-whatsapp fa-whatsapp1">
            <span>+91-8668049044</span>
          </i>
        </div>
        <div className="innerDiv_follow">
          <h3 className="footer_heading">Follow Us</h3>
          <div>
            <i className="fa fa-instagram fa-instagram1" />
            <i className="fa fa-facebook fa-facebook1" />
            <i className="fa fa-twitter fa-twitter1" />
          </div>
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/0562/4102/9306/files/ISOAsset_1.png?v=1655295519"
              alt="iso"
              className="iso-img"
            />
          </div>
        </div>
      </div>
      <div className="copy">
        <p
          style={{
            fontSize: "12px",
            marginTop: "-20px",
            // border: "1px solid red",
            textAlign: "center",
          }}
        >
          Copyright © 2023 ALPHA ENTERPRISES . All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
