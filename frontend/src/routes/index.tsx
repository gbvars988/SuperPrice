import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import HomePage from "../features/home/HomePage";
import NavBar from "../components/NavBar";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* add more routes later for other features */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
