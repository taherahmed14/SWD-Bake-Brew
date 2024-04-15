import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import About from "./About";
import Review from "./Review";
import { Shipping } from "./Shipping";
import Shop from "./Shop";
import RegisterForm from "../Components/authComponents/register";
import { VerifyUser } from "../Components/authComponents/VerifyUser";
import LoginForm from "../Components/authComponents/Login";
import TwoFactorAuthForm from "../Components/authComponents/TwoFactAuth";
import { Acknowledge } from "../Components/ShippingComponent/Acknowledge";
import { useAuth } from '../Context/Auth.context';
import { Unauthorized } from "./Unauthorized";
import { AdminProducts } from "../Components/adminComponent/tabs/Admin-products";
import { AdminRecords } from "../Components/adminComponent/tabs/Admin-records";
import CreateProduct from "../Components/adminComponent/tabs/Create-product";
import AddAdmin from "../Components/adminComponent/tabs/Add-admin";

const AllRoutes = () => {
  const { token } = useAuth();
  const sessionToken = sessionStorage.getItem("token");
  console.log("Token::", token);

  return (
    <div>
      <Routes> 
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-user/:token/:record/:role" element={<VerifyUser />} />
        <Route path="/login" element={<LoginForm role="customer" />} />
        <Route path="/2fa" element={<TwoFactorAuthForm />} />

        <Route path="/shop" element={token || sessionToken ? <Shop /> : <Unauthorized />} />
        <Route path="/about" element={token || sessionToken ? <About /> : <Unauthorized />} />
        <Route path="/review" element={token || sessionToken ? <Review /> : <Unauthorized />} />
        <Route path="/ship" element={token || sessionToken ? <Shipping /> : <Unauthorized />} />
        <Route path="/acknowledge" element={token || sessionToken? <Acknowledge /> : <Unauthorized />} />
        
        {/* admin */}
        <Route path="/org/login" element={<LoginForm role="super_admin" />} />
        <Route path="/admin/login" element={<LoginForm role="admin" />} />
        <Route path="/admin/products" element={token || sessionToken ? <AdminProducts /> : <Unauthorized />} />
        <Route path="/admin/create-product" element={token || sessionToken ? <CreateProduct /> : <Unauthorized />} />
        <Route path="/admin/admin-records" element={token || sessionToken ? <AdminRecords /> : <Unauthorized />} />
        <Route path="/admin/add-admin" element={token || sessionToken ? <AddAdmin /> : <Unauthorized />} />

      </Routes>
    </div>
  );
};

export default AllRoutes;
