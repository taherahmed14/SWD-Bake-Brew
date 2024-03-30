import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ProductDescLayout } from "../Components/ProductListComponent/ProductDescLayout";
import { useNavigate } from "react-router-dom";
const ProductDescription = () => {
  const params = useParams();
  // console.log(params);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    let items = [];
    if (typeof window !== "undefined" && window.sessionStorage) {
      items = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    }
    return items;
  });

  const handleDelete = (index) => {
    let updatedProd = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedProd);
    // sessionStorage.setItem("cartItems", JSON.stringify(updatedProd));
  };

  const handleAddToCart = (item, image, quantity) => {
    const existingItem = cartItems.find(
      (i) => (i.product_id || i.id) === item.id
    );
    if (existingItem) {
      console.log("product already in cart");
      // navigate("/cart");
    } else {
      let productdata = {
        title: item.title,
        discountPrice: item.offerPrice,
        product_id: item.id,
        image
      }
      setCartItems([...cartItems, { ...productdata, quantity: quantity }]);
      sessionStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...productdata, quantity: quantity }])
      );
      // navigate("/cart");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar cartItems={cartItems} handleDelete={handleDelete} />
      <ProductDescLayout
        handleAddToCart={handleAddToCart}
        cartItems={cartItems}
      />
      <Footer />
    </div>
  );
};

export default ProductDescription;
