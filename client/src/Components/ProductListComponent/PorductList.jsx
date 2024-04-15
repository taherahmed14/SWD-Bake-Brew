import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ProductList.moducles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../Services/bbAppServices";
import Loader from "../CommonComponents/Loader";
import shop_banner from "../../Assets/shop-banner.jpg"

const PorductList = ({ handleAddToCart, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  console.log("Token::", token);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);

    await getAllProducts(token)
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

  const removeProduct = async (item) => {
    console.log("delete data", item);
    const token = sessionStorage.getItem("token");
    await deleteProduct(item.product_id, token)
      .then((res) => {
        console.log("Res: ", res);
        getProducts();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  return (
    <div className="productlist-div">
      <div className="shop_banner_img">
        <img src={shop_banner} alt="" />
      </div>
      <br />
      <div className="product-items">
        <strong>All Products</strong> (Showing {products?.length} Items)
      </div>
      {products?.map((data) => (
        <ProductCard
          key={data.product_id}
          product={data}
          handleClick={handleAddToCart}
          removeProduct={removeProduct}
        />
      ))}
      {isLoading ? <Loader /> : ""}
    </div>
  );
};

export default PorductList;
