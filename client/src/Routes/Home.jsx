import React, { useEffect, useState } from "react";
import Carousal from "../Components/CarousalComponent/Carousal";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import carousal1 from "../Assets/carousal1.jpg";
import carousal2 from "../Assets/carousal2.jpg";
import desc1 from "../Assets/desc1.jpg";
import main_banner from "../Assets/main_banner.jpg";
import delivery from "../Assets/delivery.jpg";
import customers from "../Assets/customers.jpg";
import Protection from "../Assets/protection.png";
import Change from "../Assets/change.png";
import Delivery from "../Assets/delivery-truck.png";
import FeedbackCarousel from "../Components/FeedbackComponent/FeedbackCarousel";
import feature1 from "../Assets/feature-1.png";
import feature2 from "../Assets/feature-2.png";
import feature3 from "../Assets/feature-3.png";
import feature4 from "../Assets/feature-4.png";
import feature5 from "../Assets/feature-5.png";
import feature6 from "../Assets/feature-6.png";

const Home = () => {
  const [cartItems, setCartItems] = useState(() => {
    let items = [];
    if (typeof window !== "undefined" && window.sessionStorage) {
      items = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    }
    return items;
  });
  const changeQuantity = (e, id) => {
    let datas = cartItems?.map((el) => {
      if (el?.product_id === id?.product_id) {
        return { ...el, quantity: e?.target?.value };
      }
      return el;
    });
    setCartItems(datas);
  };

  const handleDelete = (index) => {
    let updatedProd = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedProd);
    // sessionStorage.setItem("cartItems", JSON.stringify(updatedProd));
  };

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.scrollTo(0, 0);
  }, [cartItems]);
  return (
    <div>
      <Navbar
        cartItems={cartItems}
        handleDelete={handleDelete}
        changeQuantity={changeQuantity}
      />
      <div style={{ backgroundColor: "#f0f0f0" }} className="wrapper">
        <div className="top-banner">
          <img className="main-banner" src={main_banner} alt="" />
          {/* <h1 className="bannerHeading">Think Stablizer. Think Nextron.</h1> */}
        </div>

        <div className="banner-container">
          <div className="banner-cnt-image">
            <img src={delivery} alt="" />
          </div>
          <div className="banner-content-1">
            Place your order today and install it in next 5 days.
            <p style={{ fontSize: "16px", fontWeight: "400" }}>
              We deliver products quickly and on time across India with easy Return and Replacement policy.
            </p>
          </div>
        </div>

        <div className="feature-container">
          <h2>Our Products are developed with advanced features</h2>
          <div className="feature-container-features">
            <div className="feature-container-feature-1">
              <div className="feature-container-images">
                <img src={feature1} alt="Protection" />
              </div>
              <div className="feature-container-text">
                <p>
                  Microprocessor-controlled Circuit
                </p>
              </div>
            </div>
            <div className="feature-container-feature-2">
              <div className="feature-container-images">
                <img src={feature2} alt="Replacement" />
              </div>
              <div className="feature-container-text">
                <p>
                  Copper Winding
                </p>
              </div>
            </div>
            <div className="feature-container-feature-3">
              <div className="feature-container-images">
                <img src={feature3} alt="delivery" />
              </div>
              <div className="feature-container-text">
                <p>
                  Smart Voltage Correction  
                </p>
              </div>
            </div>
            <div className="feature-container-feature-2">
              <div className="feature-container-images">
                <img src={feature4} alt="Replacement" />
              </div>
              <div className="feature-container-text">
                <p>
                  Time Delay
                </p>
              </div>
            </div>
            <div className="feature-container-feature-2">
              <div className="feature-container-images">
                <img src={feature5} alt="Replacement" />
              </div>
              <div className="feature-container-text">
                <p>
                  Hi-low Cut-off
                </p>
              </div>
            </div>
            <div className="feature-container-feature-2">
              <div className="feature-container-images">
                <img src={feature6} alt="Replacement" />
              </div>
              <div className="feature-container-text">
                <p>
                  Surge Protection
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="banner-container">
          <div className="banner-content-2">
            1000+ customers across India trust Nextron.
            <p style={{ fontSize: "16px", fontWeight: "400" }}>
              Nextron stabilizers are uniquely designed for TV, Refrigirators, AC and many other electronic products.
            </p>
          </div>
          <div className="banner-cnt-image">
            <img src={customers} alt="" />
          </div>
        </div>
    
        <div className="feature-container">
          <h2>Our Customers beleive us for</h2>
          <div className="feature-container-features">
            <div className="feature-container-feature-1">
              <div className="feature-container-images">
                <img src={Protection} alt="Protection" />
              </div>
              <div className="feature-container-text">
                <p>
                  We provide 5 years warranty, 4 years service warranty and 1 year product warranty.
                </p>
              </div>
            </div>
            <div className="feature-container-feature-2">
              <div className="feature-container-images">
                <img src={Change} alt="Replacement" />
              </div>
              <div className="feature-container-text">
                <p>
                  We offer 10 days easy Return and Replacement policy once reviewing the product.
                </p>
              </div>
            </div>
            <div className="feature-container-feature-3">
              <div className="feature-container-images">
                <img src={Delivery} alt="delivery" />
              </div>
              <div className="feature-container-text">
                <p>
                  Get products within 5 days from the deliver date anywhere across India.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="feedback-cont">
          <FeedbackCarousel />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
