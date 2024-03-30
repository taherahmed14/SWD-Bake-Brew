import NextronAppServices from "./api";
import NextronAppServicesWarranty from "./api";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getAllProducts = async () => {
  try {
    return await NextronAppServices.get(`${baseUrl}user-api/product`);
  } catch (error) {
    return error;
  }
};

export const getProductsById = async (id) => {
  try {
    return await NextronAppServices.get(`${baseUrl}user-api/product/${id}`);
  } catch (error) {
    return error;
  }
};

export const postShipperData = async (data) => {
  try {
    return await NextronAppServices.post(
      `${baseUrl}user-api/user-shipping-address`,
      data
    );
  } catch (error) {
    return error;
  }
};
export const postCartData = async (data) => {
  try {
    return await NextronAppServices.post(`${baseUrl}user-api/user-cart`, data);
  } catch (error) {
    return error;
  }
};
export const postWarrantyData = async (data) => {
  console.log('data::: ', data);
  try {
    return await NextronAppServices.post(`${baseUrl}user-api/warranty-claim`, data);
  } catch (error) {
    return error;
  }
};
export const postPayumoney = async (data) => {
  console.log('data::: ', data);
  try {
    return await NextronAppServices.post(`${baseUrl}user-api/payment/payumoney`, data);
  } catch (error) {
    return error;
  }
};
export const postAdminLogin = async (data) => {
  console.log('data::: ', data);
  try {
    return await NextronAppServices.post(`${baseUrl}admin-api/login`, data);
  } catch (error) {
    return error;
  }
};
