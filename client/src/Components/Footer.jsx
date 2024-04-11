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
              Bake & Brew
            </div>
            <div className="innerDiv_follow">
              <p className="footer_heading">Follow Us</p>
              <div>
                <i className="fa fa-instagram fa-instagram1" />
                <i className="fa fa-facebook fa-facebook1" />
                <i className="fa fa-twitter fa-twitter1" />
              </div>
            </div>
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
          Copyright © 2024 Bake & Brew.
        </p>
      </div>
    </div>
  );
};

export default Footer;
