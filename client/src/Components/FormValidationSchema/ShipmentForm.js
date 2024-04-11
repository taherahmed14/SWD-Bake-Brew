import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const shipmentvalidations = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name must only contain letters")
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must be shorter than 256 characters")
    .required("Name is required"),
  phone: yup
    .string()
    .required("Mobile number is Required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10),
  address: yup.string().required("Address is requires"),
  county: yup.string().required("County is requires"),
  eir: yup
    .string()
    .required("EIR code is required"),
  cardnumber: yup
    .string()
    .length(16, "Card Number must be 16 characters long")
    .required("Card Number is required"),
  cardname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Card Holder Name must only contain letters")
    .min(2, "Card Holder Name must be at least 2 characters long")
    .max(255, "Card Holder Name must be shorter than 256 characters")
    .required("Card Holder Name is required"),
  cvv: yup
    .string()
    .length(3, "CVV must be 3 digit")
    .required("CVV is required")
});

export const warrantyValidations = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email is Required"),
  phone: yup
    .string()
    .required("Mobile number is Required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .max(10),
  address: yup.string().required("Address is requires"),
  serialNumber: yup.string().required("Serial Number is requires"),
  model: yup.string().required("model is requires"),
  state: yup.string().required('State is required'),
  // productImg: yup.mixed().required("Image is Required"),
  // invoice: yup.mixed().required("Image is Required"),

});

