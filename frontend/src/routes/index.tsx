import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import NavBar from "../components/NavBar/NavBar";
import AuthPage from "../features/auth/AuthPage";
import ShopPage from "../features/shop/ShopPage";
import ProductPage from "../features/product/ProductPage";
import { PATH } from "../language";
import AboutStatic from "../features/about/AboutStatic";
import CheckoutPage from "../features/checkout/CheckoutPage";
import PaymentPage from "../features/checkout/PaymentPage";
import DeliveriesPage from "../features/deliveries/DeliveryPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={PATH.ABOUT} element={<AboutStatic />} />
        <Route path={PATH.HOMEPAGE} element={<HomePage />} />
        <Route path={PATH.LOGIN} element={<AuthPage />} />
        <Route path={PATH.SHOP} element={<ShopPage />} />
        <Route path={PATH.SHOP + "/:productID"} element={<ProductPage />} />
        <Route path={PATH.CHECKOUT} element={<CheckoutPage />} />
        <Route path={PATH.PAYMENT} element={<PaymentPage />} />
        <Route path={PATH.DELIVERIES} element={<DeliveriesPage />} />
        {/* add more routes later for other features */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
