import React from 'react';
import {render, screen} from '@testing-library/react';
import ShopPage from './ShopPage';
import {LABEL} from '../../language';


test('renders the shop page correctly', () => {
    render(<ShopPage/>);

    // check if all the elements are rendered
    const shopHeader = screen.getByText(LABEL.SHOP);
    expect(shopHeader).toBeInTheDocument();

    const filterHeader = screen.getByText(LABEL.FILTER);
    expect(filterHeader).toBeInTheDocument();

    const productsHeader = screen.getByText(LABEL.PRODUCTS);
    expect(productsHeader).toBeInTheDocument();
});

// TODO: add more tests for added functionality later
