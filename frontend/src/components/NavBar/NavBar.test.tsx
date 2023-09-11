import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import NavBar from './NavBar';
import {LABEL, PATH} from '../../language';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <Routes>
                <Route path={PATH.HOMEPAGE} element={ui}/>
            </Routes>
        </BrowserRouter>
    );
};

test('renders the navbar correctly', () => {
    renderWithRouter(<NavBar/>);
    expect(screen.getByText(LABEL.SUPER_PRICE)).toBeInTheDocument();
    expect(screen.getByText(LABEL.SHOP)).toBeInTheDocument();
    expect(screen.getByText(LABEL.DEALS)).toBeInTheDocument();
    expect(screen.getByText(LABEL.ABOUT)).toBeInTheDocument();
    expect(screen.getByText(LABEL.LOGIN)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search products")).toBeInTheDocument();
});
