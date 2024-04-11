import React, { useEffect, useState } from "react";
import "./CartLayout.css";
import image from "../../Assets/desc1.jpg";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import cartImg from "../../Assets/desc1.jpg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./CartLayout.css";
import NoItemCart from "../CommonComponents/NoCartItem";

const CartCard = ({ data, handleDelete, changeQuantity }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  let items = data;
  const shipping = 100;
  const tax = 25;

  useEffect(() => {
    const totalPrice = items?.reduce(
      (total, product) => total + product?.price * product?.quantity,
      0
    );
    setTotalPrice(totalPrice);
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="cart_Item_list">
        {data?.map((item, index) => (
          <>
            <div key={index} className="single_cart_item">
              <div className="imgDiv">
                <img className="imageDIv" src={image} alt="omh" />
              </div>
              <div className="name_priceDIc">
                <p>{item.title}</p>
                <p>
                  Price :<span className="offerPrice"> Rs {item.price}</span>
                  <span className="mrp">Rs {item.price}</span>
                </p>
              </div>
              <div className="name_priceDIc">
                <div className="cart_select_div">
                  <InputLabel
                    style={{ fontSize: 14 }}
                    id="demo-simple-select-label"
                  >
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.quantity}
                    label="Quantity"
                    sx={{ width: "75px", height: "25px" }}
                    onChange={(e) => {
                      changeQuantity(e, item);
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="subTotalPrice"> RS: {item.price} </div>
              <div className="cart_delete_item ">
                <RemoveCircleIcon
                  onClick={() => {
                    handleDelete(index);
                  }}
                />
              </div>
            </div>
          </>
        ))}
        {data.length > 0 ? (
          <>
            <div className="cart_subTotal_div">
              <div>Sub-Total</div>
              <div>€{totalPrice}</div>
            </div>
            <div className="cart_subTotal_div">
              <div>Shipping</div>
              <div>€{shipping}</div>
            </div>
            <div className="cart_subTotal_div">
              <div>Estimated Taxes</div>
              <div>€{tax}</div>
            </div>
            <div className="cart_Total_div">
              <div className="cart_Total">
                Total <span></span>
              </div>
              <div className="cart_Total">
                <span className="inr">INR</span> €{totalPrice + tax + shipping}
              </div>
            </div>
            <div className="cartBtnDiv">
              <NavLink to="/ship">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    width: "100%",
                    height: "100%",
                    borderRadius: "0px",
                  }}
                >
                  Checkout
                </Button>
              </NavLink>
            </div>
          </>
        ) : (
          <NoItemCart />
        )}
      </div>
    </>
  );
};

export default CartCard;
