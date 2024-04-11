import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PorductList from "../Components/ProductListComponent/PorductList";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Shop = () => {
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

  const handleAddToCart = (item) => {
    console.log("Item: ", item);
    const existingItem = cartItems.find(
      (i) => i.product_id === item.product_id
    );
    if (existingItem) console.log("product already in cart");
    else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...item, quantity: 1 },
      ]);
      sessionStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...item, quantity: 1 }])
      );
    }
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
    <div style={{ height: "auto" }}>
      <Navbar cartItems={cartItems} handleDelete={handleDelete} changeQuantity={changeQuantity} />
      <div className="product-list-div">
        <div className="product-list-filter">
          <p style={{paddingLeft: "20px"}}>Filters</p>
          <Divider />
          <div className="filter_form">
            <p style={{paddingLeft:"20px"}}>Filter by</p>
            <FormGroup>
              <FormControlLabel
                style={{ marginTop: "0.5rem", marginLeft: "1rem" }}
                control={
                  <Checkbox
                    style={{
                      transform: "scale(0.7)",
                    }}
                  />
                }
                label={
                  <span style={{ fontSize: "14px" }}>{"Bake"}</span>
                }
              />
              <FormControlLabel
                style={{ marginLeft: "1rem" }}
                control={
                  <Checkbox
                    style={{
                      transform: "scale(0.7)",
                    }}
                  />
                }
                label={<span style={{ fontSize: "14px" }}>{"Brew"}</span>}
              />
            </FormGroup>

            <p style={{paddingLeft:"20px"}}>Sort by</p>
            <FormGroup>
              <FormControlLabel
                style={{ marginTop: "0.5rem", marginLeft: "1rem" }}
                control={
                  <Checkbox
                    style={{
                      transform: "scale(0.7)",
                    }}
                  />
                }
                label={
                  <span style={{ fontSize: "14px" }}>{"Price high to low"}</span>
                }
              />
              <FormControlLabel
                style={{ marginLeft: "1rem" }}
                control={
                  <Checkbox
                    style={{
                      transform: "scale(0.7)",
                    }}
                  />
                }
                label={<span style={{ fontSize: "14px" }}>{"Price low to high"}</span>}
              />
            </FormGroup>
          </div>
        </div>
        <PorductList 
          cartItems={cartItems} 
          handleAddToCart={handleAddToCart} 
        />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
