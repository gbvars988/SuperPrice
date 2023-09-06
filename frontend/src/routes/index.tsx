import React from 'react';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import HomePage from "../features/home/HomePage";
import NavBar from "../components/NavBar/NavBar";
import AuthPage from "../features/auth/AuthPage";
import ShopPage from "../features/shop/ShopPage";
import {PATH} from "../language";
import { OrderSummary } from '../features/checkout/OrderSummary';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path={PATH.HOMEPAGE} element={<HomePage/>}/>
                <Route path={PATH.LOGIN} element={<AuthPage/>}/>
                <Route path={PATH.SHOP} element={<ShopPage/>}/>
                <Route path={PATH.ORDER} element={<OrderSummary/>}/>
                {/* add more routes later for other features */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
