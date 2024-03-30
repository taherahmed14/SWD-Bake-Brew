import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ProductList.moducles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../Services/NextronAppServices";
import Loader from "../CommonComponents/Loader";

const PorductList = ({ handleAddToCart, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    await getAllProducts()
      .then((res) => {
        console.log("All products: ", res.data.products);
        setProducts(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setIsLoading(false);
      });
  };

  return (
    <div className="productlist-div">
      <div className="navigation">
        <span className="navigationDiv" onClick={() => navigate(`/`)}>
          Home
        </span>{" "}
        > All Products
      </div>
      <div className="product-items">
        <strong>All Stablizers</strong> (Showing {products?.length} Items)
      </div>
      {products?.map((data) => (
        <ProductCard
          key={data.product_id}
          product={data}
          handleClick={handleAddToCart}
        />
      ))}
      {isLoading ? <Loader /> : ""}
    </div>
  );
};

export default PorductList;
