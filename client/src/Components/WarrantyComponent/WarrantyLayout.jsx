import { Button, TextField } from "@mui/material";
import { height, width } from "@mui/system";
import React, { useState } from "react";
import "./Warranty.css";
import { useFormik } from "formik";
import {
  postCartData,
  postShipperData,
  postWarrantyData,
} from "../../Services/NextronAppServices";
import { warrantyValidations } from "../FormValidationSchema/ShipmentForm";
import axios from "axios";
import desc1 from "../../Assets/desc1.jpg";

const WarrantyLayout = () => {
  const [files, setFiles] = useState([]);

  const onSubmit = async () => {
    console.log("values::: ", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("serialNumber", values.serialNumber);
    formData.append("contactNumber", values.phone);
    formData.append("modelNumber", values.model);
    formData.append("state", values.state);
    formData.append("productFeedback", values.suggestions);

    console.log("Files: ", files);

    for(let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i].file);
    }

    axios({
      method: "post",
      url: "http://localhost:4200/user-api/warranty-claim",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        model: "",
        phone: "",
        serialNumber: "",
        address: "",
        suggestions: "",
        productImg: "",
        invoice: "",
        state: "",
        serialNoPic: "",
      },
      validationSchema: warrantyValidations,
      onSubmit,
    });

  const handleFile = (e, docType) => {
    console.log("Inside file upload: ", e.target.files);
    let data = {
      file: e.target.files[0],
      docType
    }

    setFiles([...files, data]);
  }
  
  return (
    <div className="warranty-main-div">
      <form onSubmit={handleSubmit}>
        <div className="warranty-form-div">
          <h2>Warranty Registration Form</h2>
          <div className="textFeild">
            <TextField
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Enter Full Name"
              type="text"
              required={true}
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            <TextField
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Enter Email ID"
              type="text"
              required={true}
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            {errors.email && touched.email && (
              <p className="formError">{errors.email}</p>
            )}

            <TextField
              name="serialNumber"
              value={values.serialNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Serial Number"
              type="text"
              required={true}
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            {errors.orderId && touched.orderId && (
              <p className="formError">{errors.orderId}</p>
            )}
            <TextField
              name="model"
              value={values.model}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Enter Model Number"
              type="text"
              required={true}
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            {errors.model && touched.model && (
              <p className="formError">{errors.model}</p>
            )}

            <TextField
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Address"
              type="text"
              required={true}
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            <TextField
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              label="State"
              type="text"
              required={true}
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            <TextField
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Mobile Number"
              type="text"
              required={true}
              variant="standard"
              inputProps={{ maxLength: 10 }}
              style={{
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            <TextField
              name="suggestions"
              value={values.suggestions}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Suggestion & Feedbacks"
              type="text"
              required={true}
              // autoComplete="current-password"
              variant="standard"
              // inputProps={{ maxLength: 10 }}
              style={{
                // backgroundColor: "blue"
                width: "100%",
                marginBottom: "0.5px",
                justifyContent: "left",
              }}
            />
            <div className="product-pic">
              <p>Installed Product Photo : </p>
              <input
                name="productImg"
                accept=".jpg, .jpeg, .png, application/pdf"
                style={{ display: "none" }}
                type="file"
                id="select-image"
                onChange={(e) => {handleFile(e, "Product Photo")}}
              />
              <label htmlFor="select-image">
                <Button
                  component="span"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    fontSize: "12px",
                    color: "grey",
                    margin: "0.5rem 1rem",
                  }}
                  variant="outlined"
                >
                  Upload File
                </Button>
              </label>
              {errors.productImg && touched.productImg && (
                <p className="formError">{errors.productImg}</p>
              )}
            </div>
            <div className="product-pic">
              <p>Serial Number : </p>
              <input
                name="serialNoPic"
                accept=".jpg, .jpeg, .png, application/pdf"
                style={{ display: "none" }}
                type="file"
                id="serial-pic"
                onChange={(e) => {handleFile(e, "Serial Number")}}
              />
              <label htmlFor="serial-pic">
                <Button
                  component="span"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    fontSize: "12px",
                    color: "grey",
                    margin: "0.5rem 1rem",
                  }}
                  variant="outlined"
                >
                  Upload File
                </Button>
              </label>
              {errors.productImg && touched.productImg && (
                <p className="formError">{errors.productImg}</p>
              )}
            </div>
            <div className="product-pic">
              <p>Invoice Photo Or pdf : </p>
              <input
                name="invoice"
                accept=".jpg, .jpeg, .png, application/pdf"
                style={{ display: "none" }}
                type="file"
                id="upload"
                onChange={(e) => {handleFile(e, "Invoice")}}
              />
              <label htmlFor="upload">
                <Button
                  component="span"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid gray",
                    fontSize: "12px",
                    color: "grey",
                    margin: "0.5rem 1rem",
                  }}
                  variant="outlined"
                >
                  Upload File
                </Button>
              </label>
            </div>
          </div>
          <div className="sampleImg">
            <img className="showImg" src={desc1} alt="sample" />
          </div>
          <div className="warranty-btn">
            <Button
              style={{
                backgroundColor: "black",
                border: "1px solid gray",
                fontSize: ".975rem",
                color: "white",
                margin: "1rem 0px",
              }}
              variant="outlined"
              type="submit"
            >
              Submit Form
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WarrantyLayout;
