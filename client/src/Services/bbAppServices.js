import bbAppServices from "./api";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const postUserRegister = async (data) => {
  console.log('data::: ', data);
  try {
    return await bbAppServices.post(`${baseUrl}auth/register`, data);
  } catch (error) {
    return error;
  }
}

export const verifyUser = async (data) => {
  try {
    return await bbAppServices.post(`${baseUrl}auth/verify`, data);
  } catch (error) {
    return error;
  }
};

export const postUserLogin = async (data) => {
  console.log('data::: ', data);
  try {
    return await bbAppServices.post(`${baseUrl}auth/login`, data);
  } catch (error) {
    return error;
  }
}

export const postVerifyOtp = async (data) => {
  console.log('data::: ', data);
  try {
    return await bbAppServices.post(`${baseUrl}auth/otp`, data);
  } catch (error) {
    return error;
  }
}

export const getAllProducts = async (token) => {
  try {
    return await axios.get(`${baseUrl}user-api/product`, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id, token) => {
  console.log("Delete token::", token);
  try {
    return await axios.patch(`${baseUrl}admin-api/delete-product/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    return error;
  }
};

export const createNewProduct = async (data, token) => {
  console.log("Delete token::", token);
  try {
    return await axios.post(`${baseUrl}admin-api/product`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    return error;
  }
};

export const postAdminRegister = async (data, token) => {
  console.log('data::: ', data);
  try {
    return await bbAppServices.post(`${baseUrl}auth/admin-register`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    return error;
  }
}

export const getAllAdmin = async (token) => {
  try {
    return await axios.get(`${baseUrl}admin-api/get-admins`, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    return error;
  }
};

export const deleteAdmin = async (id, token) => {
  console.log("token::", token);
  try {
    return await axios.delete(`${baseUrl}admin-api/delete-admin/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    return error;
  }
};

export const postShipperData = async (data, token, csrf) => {
  try {
    return await axios.post(`${baseUrl}user-api/user-shipping-address`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-CSRF-Token": csrf
        }
      }
    );
    // return await bbAppServices.post(
    //   `${baseUrl}user-api/user-shipping-address`,
    //   data
    // );
  } catch (error) {
    return error;
  }
};
export const postCartData = async (data, token, csrf) => {
  console.log("Token::", token);
  try {
    return await axios.post(`${baseUrl}user-api/user-cart`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-CSRF-Token": csrf
        }
      }
    );
    // return await bbAppServices.post(`${baseUrl}user-api/user-cart`, 
    // data);
  } catch (error) {
    return error;
  }
};
export const postPaymentData = async (data, token, csrf) => {
  try {
    return await axios.post(`${baseUrl}user-api/user-payment`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-CSRF-Token": csrf,
        }
      }
    );
    // return await bbAppServices.post(`${baseUrl}user-api/user-cart`, 
    // data);
  } catch (error) {
    return error;
  }
};


export const postAdminLogin = async (data) => {
  console.log('data::: ', data);
  try {
    return await bbAppServices.post(`${baseUrl}admin-api/login`, data);
  } catch (error) {
    return error;
  }
};
