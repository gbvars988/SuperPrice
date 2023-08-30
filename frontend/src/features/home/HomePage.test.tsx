import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './HomePage';
import {LABEL, PATH} from '../../language';
import {act} from "react-dom/test-utils";

// helper component to display current url location
export const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};

// first render the component in a router to test for correct navigation behaviour
const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <Routes>
                <Route path={PATH.HOMEPAGE} element={ui}/>
                <Route path={PATH.SHOP}  element={<div>Shop Page</div>}/>
            </Routes>
            <LocationDisplay/>
        </BrowserRouter>
    );
};

test('renders the home page correctly', () => {
    renderWithRouter(<HomePage/>);

    // check that all labels, buttons and images are rendered
    const headlineElement = screen.getByText(LABEL.HEAD_LINE);
    expect(headlineElement).toBeInTheDocument();
    const shopAllButton = screen.getByRole('button', {name: LABEL.SHOP_ALL})
    expect(shopAllButton).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
});

test('navigate to /shop when clicking the Shop All button', async () => {
    renderWithRouter(<HomePage/>);

    const shopAllButton = screen.getByText(LABEL.SHOP_ALL);

    // click the shop all button
    await act(async () => {
        await userEvent.click(shopAllButton);
    });

    // test that the display location is now /shop
    const locationDisplay = screen.getByTestId('location-display');
    expect(locationDisplay).toHaveTextContent(PATH.SHOP);
});
