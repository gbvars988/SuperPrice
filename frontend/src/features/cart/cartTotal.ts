import React,  { useContext } from 'react';


import { CartContext, CartItem } from "../../context/CartContext";

export type FormatPriceOptions = { locale?: string; currency?: string }

export const CartTotal = () => {

  const { cartItems } = useContext(CartContext);

  //const calculateTotal = () => {
  return cartItems
    .reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
    .toFixed(2);

};