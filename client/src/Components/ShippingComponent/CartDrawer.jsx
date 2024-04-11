import { Button } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useEffect } from "react";
import { useState } from "react";
import NoItemCart from "../CommonComponents/NoCartItem";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ data, handleDelete, changeQuantity }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  let items = data;
  const shipping = 100;
  const tax = 25;

  const navigate = useNavigate();

  const [base64String, setbase64String] = useState([""]);
  useEffect(() => {
    console.log("Cart data: ", data);
    let base64Arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.data?.data) {
        base64Arr.push(
          btoa(String.fromCharCode(...new Uint8Array(data[i]?.data?.data)))
        );
      } else if (data[i]?.image) {
        base64Arr.push(data[i]?.image);
      }
    }
    setbase64String(base64Arr);
    // console.log("Base 64: ", base64String);
  }, [items]);

  useEffect(() => {
    const totalPrice = items?.reduce(
      (total, product) => total + +product?.price * product?.quantity,
      0
    );
    setTotalPrice(totalPrice);
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);
  // console.log('items::: ', items);

  return (
    <>
      <div className="shipping_products">
        <h2>My Cart ({items.length})</h2>
        {items?.length > 0 ? (
          items?.map((item, index) => (
            <>
              <div key={index} className="cart_item_div">
                <div className="cart_image_div">
                  <img
                    className="cart_img"
                    src={`data:image/png;base64,${base64String[index]}`}
                    alt="cartImg"
                  />
                </div>
                <div>
                  <div className="cart_name_div"> {item.title}</div>
                  <div className="cart_proce_div">€ {item.price}</div>
                </div>
                <div className="cart_select_div">
                  {/* <InputLabel id="demo-simple-select-label">
                    Quantity
                  </InputLabel> */}
                  <Select
                    className="quantitySelect"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item?.quantity}
                    label="Quantity"
                    sx={{ width: "50px", height: "25px" }}
                    onChange={(e) => {
                      changeQuantity(e, item);
                    }}
                    // onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>

                  <div
                    className="cart_delete_item"
                    onClick={() => {
                      handleDelete(index);
                    }}
                    style={{cursor:"pointer"}}
                  >
                    Remove
                  </div>
                </div>
                {/* <div className="cart_delete_item ">
                  <RemoveCircleIcon
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </div> */}
              </div>
            </>
          ))
        ) : (
          <>
            <NoItemCart />
          </>
        )}
        {items?.length > 0 ? (
          <div className="cartSum">
            <div className="cart_subTotal_div">
              <div>Sub-Total</div>
              <div>€{totalPrice}</div>
            </div>
            <div className="cart_subTotal_div">
              <div>Shipping</div>
              <div>€ 3</div>
            </div>
            <div className="cart_subTotal_div">
              <div>Estimated Taxes</div>
              <div>€ 1</div>
            </div>
            <div className="cart_Total_div">
              <div className="cart_Total">
                Total <span></span>
              </div>
              <div className="cart_Total">
                <span className="inr"></span> €{totalPrice + 1 + 3}
              </div>
            </div>
            <Button
              style={{
                backgroundColor: "black",
                border: "1px solid gray",
                fontSize: "12px",
                color: "white",
                marginTop: "20px",
                padding: "10px",
                width: "100%",
              }}
              variant="outlined"
              onClick={() => {
                navigate("/ship");
              }}
            >
              CHECKOUT
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CartDrawer;
