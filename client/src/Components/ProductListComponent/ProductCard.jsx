import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Carousal from "../CarousalComponent/Carousal";
import "./ProductList.moducles.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (product) => {
  const navigate = useNavigate();
  const [base64String, setbase64String] = useState();
  useEffect(() => {
    setbase64String(
      btoa(String.fromCharCode(...new Uint8Array(product?.product?.data.data)))
    );
  }, [product]);

  return (
    <div className="productCArd-div">
      <div className="image-div">
        <img
          className="desc-img"
          src={`data:image/png;base64,${base64String}`}
          alt="img"
        />
        <div style={{ marginTop: ".564rem" }} className="mobile-button"></div>
      </div>

      <div className="desc-div">
        <h2 style={{ fontSize: "16px", height: "40px", overflow: "hidden" }}>
          {product?.product?.title}
        </h2>
        <div className="shortDesc_div">{product?.product?.category}</div>
        <div className="shortDesc_div">{product?.product?.mountType}</div>
        <div className="shortDesc_div">
          <div>
            Price &nbsp;
            <strong>
              ₹ {product?.product?.discountPrice}
            </strong> 
            <span style={{textDecoration: "line-through"}}>
              ₹ {product?.product?.price} 
            </span> 
            <span style={{color: "blue"}}> 
              {product?.product?.discount}% off
            </span>
          </div>
        </div>
        <div style={{ fontSize: "12px", marginBottom: "20px" }}>
          Free Delivery
        </div>
        <div style={{ marginTop: ".564rem" }} className="product-button">
          {/* <NavLink style={{ textDecoration: "none" }} to="/cart"> */}
          <Button
            style={{
              backgroundColor: "white",
              border: "1px solid gray",
              fontSize: "12px",
              color: "grey",
            }}
            variant="outlined"
            onClick={() => product?.handleClick(product.product)}
          >
            Add to Cart
          </Button>
          {/* </NavLink> */}

          <Button
            style={{
              backgroundColor: "black",
              border: "1px solid gray",
              fontSize: "12px",
              color: "white",
              marginLeft: "1rem",
            }}
            variant="outlined"
            onClick={() => navigate(`/shop/${product?.product?.product_id}`)}
          >
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
