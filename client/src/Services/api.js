import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
// console.log("url::: ", url);
const NextronAppServices = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
export const NextronAppServicesWarranty = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default NextronAppServices;
