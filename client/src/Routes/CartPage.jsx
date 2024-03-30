import React, { useEffect, useState } from "react";
import CartLayout from "../Components/CartComponent/CartLayout";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const CartPage = () => {
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
    <>
      <Navbar
        changeQuantity={changeQuantity}
        cartItems={cartItems}
        handleDelete={handleDelete}
      />
      <CartLayout
        changeQuantity={changeQuantity}
        data={cartItems}
        handleDelete={handleDelete}
      />
      <Footer />
    </>
  );
};

export default CartPage;
