import React from "react";
import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react";
import CartDrawer from './CartDrawer'; // Path to your component file
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { LABEL, PATH } from "../../language/index";

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <Routes>
          <Route path={PATH.HOMEPAGE} element={ui} />
        </Routes>
      </BrowserRouter>,
    );
  };

/* export type CartContextType = {
  cartItems: CartItem[];
  checkoutInfo: CheckoutInfo | null;
  setCheckoutInfo: (info: CheckoutInfo) => void;
  //setProducts(cartItems: CartItem[]): void;
  addToCart: (item: CartItem) => void;
  increaseProductQty: (item: CartItem) => void;
  decreaseProductQty: (item: CartItem) => void;
  //removeFromCart: (productID: string) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
};

export type CartItem = {
  productID: string;
  name: string;
  description: string;
  weight: number;
  quantity: number;
  price: number;
  supermarketName: string;
  imageURL: string;
};
*/
const mockCartItem = {
    productID: '1',
    name: 'sample',
    quantity: 3,
    price: 4.20,
    imageURL: 'http://sampleurl.com/image.jpg'
}

const mockCart = {
    cartItems: mockCartItem,
}

describe ('Cart Drawer', () => {

    test('Cart drawer opens and closes on click', () => {
        const cartDrawer = jest.fn();

        render(<button onClick = {cartDrawer} />);
        fireEvent.click(screen.getByTestId('Shopping Cart'));
        expect(cartDrawer).toHaveBeenCalled();

    });

    test('renders correctly when cart is empty', () => {
        renderWithRouter(<CartDrawer />);
        expect(screen.getByText("Start Shopping")).toBeInTheDocument();    
    });

        
    

});