import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
// console.log("url::: ", url);
const bbAppServices = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
  },
});

export default bbAppServices;
