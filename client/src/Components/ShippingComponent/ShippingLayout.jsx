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
  postPayumoney
} from "../../Services/NextronAppServices";
import ModalMui from "../CommonComponents/Modal";
import ToasterComponent from "../CommonComponents/ToasterComponent";
import { toast } from "react-toastify";
import axios from "axios";

const ShippingLayout = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCLick = () => {
    if (Object.values(values).includes("")) {
      toast.error("Please Fill the shipping details correctly");
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    const totalPrice = cartItems?.reduce(
      (total, product) => total + +product?.discountPrice * product?.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, []);
  const navigate = useNavigate();

  const onSubmit = async () => {
    let cartObj = {
      email: values.email,
      products: [
        cartItems.map((el) => ({
          productId: el.product_id,
          quantity: el.quantity,
          price: el.price,
        })),
      ],
      paymentStatus: false,
      totalPayment: totalPrice,
    };
    let shipObj = {
      fullName: values.firstName + " " + values.lastName,
      email: values.email,
      phNumber: values.phone,
      street: values.address + "" + values.steet,
      city: values.city,
      state: values.state,
      zipcode: values.postal,
    };
    await postShipperData(shipObj)
      .then((result) => {
        if (result.data.status === 200 && result.status === 201) {
          console.log(result.data.message);
        }
      })
      .catch((error) => console.log("error", error));

    await postCartData(cartObj)
      .then((result) => {
        if (result.data.status === 200 && result.status === 201) {
          console.log(result.data.message);
          payumoney(values);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const payumoney = async (values) => {
    var pd = {
      key: process.env.payumoneyMerchantKey,
      txnid: `Nextron-${new Date().getTime()}-${Math.random()}`,
      amount: 1, //pass dynamic amount
      firstname: values.firstName,
      email: values.email,
      phone: values.phone,
      productinfo: "Product 1", //pass dynamic product detail
      surl: `http://localhost:3000/`, //prepare a success page
      furl: `http://localhost:3000/`, //prepare a failure page
      hash: ''
    }

    // let self = this;
    await postPayumoney(pd)
      .then((result) => {
        console.log("Payumoney result: ", result);
        if (result.data.status === 200) {
          redirectToPayU(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  }

  const redirectToPayU = async (paymentDetails) => {
    let paymentString = `
      <html>
        <body>
          <form action="${paymentDetails.payuURL}" method="post" id="payu_form">
            <input type="hidden" name="firstname" value="${paymentDetails.data.firstname}"/>
            <input type="hidden" name="email" value="${paymentDetails.data.email}"/>
            <input type="hidden" name="phone" value="${paymentDetails.data.phone}"/>
            <input type="hidden" name="surl" value="${paymentDetails.data.surl}"/>
            <input type="hidden" name="furl" value="${paymentDetails.data.furl}"/>
            <input type="hidden" name="key" value="${paymentDetails.merchantKey}"/>
            <input type="hidden" name="hash" value="${paymentDetails.hash}"/>
            <input type="hidden" name="txnid" value="${paymentDetails.data.txnid}"/>
            <input type="hidden" name="productinfo" value="${paymentDetails.data.productinfo}"/>
            <input type="hidden" name="amount" value="${paymentDetails.data.amount}"/>
            <button type="submit" value="submit" #submitBtn></button>
          </form>
          <script type="text/javascript">document.getElementById("payu_form").submit();</script>
        </body>
      </html>`;
        
    const winUrl = URL.createObjectURL(
        new Blob([paymentString], { type: "text/html" })
    );

    window.location.href = winUrl;
  }

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
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      steet: "",
      city: "",
      postal: "",
    },
    validationSchema: shipmentvalidations,
    onSubmit,
  });

  return (
    <div className="ship_main_div">
      <div className="ship_left_div">
        <div>
          <div className="navigation">
            <span className="navigationDiv" onClick={() => navigate(`/`)}>
              Home
            </span>{" "}
            ">"
            <span className="navigationDiv" onClick={() => navigate(`/shop`)}>
              Shop
            </span>{" "}
            ">" Shipping Details
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="shiping_form_div">
            <div className="ship_head">Contact Details</div>
            <div className="ship_input_div">
              <TextField
                // id="standard-email-input"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                // type="email"
                required={true}
                variant="standard"
                style={{
                  width: "100%",
                }}
              />
              {errors.email && touched.email && (
                <p className="formError">{errors.email}</p>
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
            </div>
            <div className="ship_head">Shipping Details</div>
            <div className="ship_input_div">
              <TextField
                name="firstName"
                label="First Name"
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
              {errors.firstName && touched.firstName && (
                <p className="formError">{errors.firstName}</p>
              )}
              <TextField
                name="lastName"
                label="Last Name"
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
              {errors.lastName && touched.lastName && (
                <p className="formError">{errors.lastName}</p>
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
                name="steet"
                label="Area or Street Address"
                type="text"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  width: "100%",
                }}
              />
              {errors.steet && touched.steet && (
                <p className="formError">{errors.steet}</p>
              )}
              <TextField
                name="city"
                label="City"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                style={{
                  width: "100%",
                }}
              />
              {errors.city && touched.city && (
                <p className="formError">{errors.city}</p>
              )}
              <TextField
                name="state"
                label="State"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                style={{
                  width: "100%",
                }}
              />
              {errors.state && touched.state && (
                <p className="formError">{errors.state}</p>
              )}
              <TextField
                name="postal"
                label="Postal Code"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                style={{
                  width: "100%",
                }}
                inputProps={{ maxLength: 6 }}
              />
              {errors.postal && touched.postal && (
                <p className="formError">{errors.postal}</p>
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
              <NavLink style={{ textDecoration: "none" }} to="/cart">
                <Button
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    fontSize: "14px",
                    color: "grey",
                  }}
                  variant="outlined"
                >
                  Return To Cart
                </Button>
              </NavLink>
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
