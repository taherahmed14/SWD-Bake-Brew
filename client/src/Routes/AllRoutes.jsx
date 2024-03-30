import React from "react";
import { Routes, Route } from "react-router-dom";
import PaymentPage from "../Components/PaymentAndABillingCompoennt/PaymentPage";
import About from "./About";
import Billing from "./Billing";
import CartPage from "./CartPage";
import Contact from "./Contact";
import Home from "./Home";
import ProductDescription from "./ProductDescription";
import Review from "./Review";
import { Shipping } from "./Shipping";
import Shop from "./Shop";
import Warranty from "./Warranty";
import { AdminLogin } from "../Components/adminComponent/admin-login";
import { WarrantyTab } from "../Components/adminComponent/tabs/admin-warranty";
import { AdminPortal } from "../Components/adminComponent/admin-portal";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />
        <Route path="/Warranty" element={<Warranty />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/shop/:id" element={<ProductDescription />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ship" element={<Shipping />} />
        <Route path="/bill" element={<Billing />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPortal />} />
        <Route path="/admin/warranty" element={<WarrantyTab />} />

      </Routes>
    </div>
  );
};

export default AllRoutes;
