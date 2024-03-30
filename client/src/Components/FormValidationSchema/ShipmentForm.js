import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const shipmentvalidations = yup.object().shape({
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
  firstName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name must only contain letters")
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must be shorter than 256 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name must only contain letters")
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must be shorter than 256 characters")
    .required("Last Name is required"),
  steet: yup.string().required("Street is requires"),
  address: yup.string().required("Address is requires"),
  city: yup.string().required("City is requires"),
  state: yup.string().required("State is requires"),
  postal: yup
    .string()
    .matches(
      "^[1-9][0-9]{5}$",
      "Postal code must start with 6 and be 6 characters long"
    )
    .length(6, "Postal code must be 6 characters long")
    .required("Postal code is required"),
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

