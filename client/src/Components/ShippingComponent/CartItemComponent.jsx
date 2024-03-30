import React, { useEffect, useState } from "react";
import "./ShippingLayout.css";
import cartImg from "../../Assets/desc1.jpg";

const CartItemComponent = ({ cartItems,totalPrice }) => {
  const shipping = 100;
  const tax = 25;

  const [base64String, setbase64String] = useState([""]);

  useEffect(() => {
    let base64Arr = [];
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]?.data?.data) {
        base64Arr.push(
          btoa(String.fromCharCode(...new Uint8Array(cartItems[i]?.data?.data)))
        );
      } else if (cartItems[i]?.image) {
        base64Arr.push(cartItems[i]?.image);
      }
    }
    setbase64String(base64Arr);
  }, []);

  return (
    <div className="ship_right_div">
      <div className="shipping_products">
        {cartItems.map((item, index) => (
          <>
            <div className="cart_item_div">
              <div className="cart_image_div">
                <img className="cart_img" src={`data:image/png;base64,${base64String[index]}`} alt="cartImg" />
              </div>
              <div className="cart_name_div"> {item.title}</div>
              <div className="cart_proce_div">
                {" "}
                ₹ {item.discountPrice} x {item.quantity}
              </div>
            </div>
          </>
        ))}
      </div>
      <div>
        <div className="cart_subTotal_div">
          <div>Sub-Total</div>
          <div>₹{totalPrice}</div>
        </div>
        <div className="cart_subTotal_div">
          <div>Shipping</div>
          <div>₹{shipping}</div>
        </div>
        <div className="cart_subTotal_div">
          <div>Estimated Taxes</div>
          <div>₹{tax}</div>
        </div>
        <div className="cart_Total_div">
          <div className="cart_Total">
            Total <span></span>
          </div>
          <div className="cart_Total">
            <span className="inr">INR</span> ₹{totalPrice + shipping + tax}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
