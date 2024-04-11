import React, { useEffect, useState } from "react";
import "./ShippingLayout.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import CartItemComponent from "./CartItemComponent";
import { useFormik } from "formik";
import { shipmentvalidations } from "../FormValidationSchema/ShipmentForm";
import {
  postCartData,
  postShipperData,
  postPayumoney,
  postPaymentData
} from "../../Services/NextronAppServices";
import ModalMui from "../CommonComponents/Modal";
import ToasterComponent from "../CommonComponents/ToasterComponent";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/Auth.context";

const ShippingLayout = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const { csrf } = useAuth();

  console.log("Csrf Token Context::", csrf);

  const handleCLick = () => {
    if (Object.values(values).includes("")) {
      toast.error("Please Fill the shipping details correctly");
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    const totalPrice = cartItems?.reduce(
      (total, product) => total + +product?.price * product?.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, []);
  const navigate = useNavigate();

  const onSubmit = async () => {
    const user_id = sessionStorage.getItem("user")
    const token = sessionStorage.getItem("token");

    const cartObj = {
      user_id,
      products: [
        cartItems.map((el) => ({
          productId: el.product_id,
          quantity: el.quantity,
          price: el.price,
        })),
      ],
      paymentStatus: true,
      totalPayment: totalPrice,
    };
    const shipObj = {
      user_id,
      name: values.name,
      phNumber: parseInt(values.phone, 10),
      address: values.address,
      county: values.county,
      eir: values.eir,
    };
    const paymentObj = {
      user_id,
      cardnumber: values.cardnumber,
      cardname: values.cardname,
      cvv: values.cvv
    }

    await postCartData(cartObj, token)
      .then((result) => {
        if (result.data.status === 200 && result.status === 201) {
          console.log(result.data.message);
        }
      })
      .catch((error) => console.log("error", error));

    await postShipperData(shipObj, token)
      .then((result) => {
        if (result.data.status === 200 && result.status === 201) {
          console.log(result.data.message);
        }
      })
      .catch((error) => console.log("error", error));

    await postPaymentData(paymentObj, token)
      .then((result) => {
        if (result.data.status === 200 && result.status === 201) {
          console.log(result.data.message);
          sessionStorage.removeItem("cartItems")
          navigate("/acknowledge")
        }
      })
      .catch((error) => console.log("error", error));
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      county: "",
      eir: "",
      cardnumber: "",
      cardname: "",
      cvv: ""
    },
    validationSchema: shipmentvalidations,
    onSubmit,
  });

  return (
    <div className="ship_main_div">
      <div className="ship_left_div">
        <form onSubmit={handleSubmit}>
          <div className="shiping_form_div">
            <div className="ship_head">Shipping Details</div>
            <div className="ship_input_div">
              <TextField
                name="name"
                label="Name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                // autoComplete="current-password"
                variant="standard"
                style={{
                  // backgroundColor: "blue"
                  width: "100%",
                }}
              />
              {errors.name && touched.name && (
                <p className="formError">{errors.name}</p>
              )}
              <TextField
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone"
                type="text"
                required={true}
                variant="standard"
                style={{
                  width: "100%",
                }}
                inputProps={{ maxLength: 10 }}
              />
              {errors.phone && touched.phone && (
                <p className="formError">{errors.phone}</p>
              )}
              <TextField
                name="address"
                label="Address"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                variant="standard"
                style={{
                  width: "100%",
                }}
              />
              {errors.address && touched.address && (
                <p className="formError">{errors.address}</p>
              )}
              <TextField
                name="county"
                label="County"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                required={true}
                style={{
                  width: "100%",
                }}
              />
              {errors.county && touched.county && (
                <p className="formError">{errors.county}</p>
              )}
              <TextField
                name="eir"
                label="EIR"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                required={true}
                style={{
                  width: "100%",
                }}
                inputProps={{ maxLength: 9 }}
              />
              {errors.eir && touched.eir && (
                <p className="formError">{errors.eir}</p>
              )}
            </div>

            <div className="ship_head">Payment Details</div>
            <div className="ship_input_div">
              <TextField
                name="cardnumber"
                label="Card Number"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                // autoComplete="current-password"
                variant="standard"
                style={{
                  // backgroundColor: "blue"
                  width: "100%",
                }}
                inputProps={{ maxLength: 16 }}
              />
              {errors.cardnumber && touched.cardnumber && (
                <p className="formError">{errors.cardnumber}</p>
              )}
              <TextField
                name="cardname"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Card Holder Name"
                type="text"
                required={true}
                variant="standard"
                style={{
                  width: "100%",
                }}
              />
              {errors.cardname && touched.cardname && (
                <p className="formError">{errors.cardname}</p>
              )}
              <TextField
                name="cvv"
                label="CVV"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                variant="standard"
                style={{
                  width: "100%",
                }}
                inputProps={{ maxLength: 3 }}
              />
              {errors.cvv && touched.cvv && (
                <p className="formError">{errors.cvv}</p>
              )}
            </div>

            <div className="bot_button">
              {/* <NavLink style={{ textDecoration: "none" }} to="/bill"> */}
              <Button
                style={{
                  backgroundColor: "black",
                  border: "1px solid gray",
                  fontSize: "14px",
                  color: "white",
                  padding: "18px"
                  // margin: "auto",
                }}
                variant="outlined"
                onClick={handleCLick}
              >
                Continue To Payment
              </Button>
              {/* </NavLink> */}
            </div>
          </div>
        </form>
      </div>
      <CartItemComponent cartItems={cartItems} totalPrice={totalPrice} />
      <ModalMui
        onSubmit={onSubmit}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <ToasterComponent />
    </div>
  );
};

export default ShippingLayout;
