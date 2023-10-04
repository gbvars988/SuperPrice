import React,  { useContext } from 'react';
import { CartContext, CartItem } from "../../context/CartContext";

export type FormatPriceOptions = { 
  locale?: string; 
  currency?: string 
};

// this is the total cost of all of the combined items in the cart
export const CartTotal = () => {
  const { cartItems } = useContext(CartContext);

  return cartItems
    .reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
    .toFixed(2);
};

// this is the total quantity of all of the items in the cart combined
// it's used for the number that displays over the cart icon
export const TotalCartItems = () => {
  const { cartItems } = useContext(CartContext);

  return cartItems
      .reduce((ttl: number, item: CartItem) => ttl + item.quantity, 0)
      .toFixed(0);
};

// this is the total price for the quantity of each individual item in the cart
