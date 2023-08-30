import React from 'react';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import HomePage from "../features/home/HomePage";
import NavBar from "../components/NavBar";
import AuthPage from "../features/auth/AuthPage";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<AuthPage/>}/>
                {/* add more routes later for other features */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
