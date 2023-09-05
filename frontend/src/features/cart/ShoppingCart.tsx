import React from 'react';
import { createContext, useContext, useState } from "react";
//import { useShoppingCart } from '../context/ShoppingCartContext';
//import { CartProduct } from './CartProduct';
import {Box, Button, Heading, IconButton, Image, VStack} from '@chakra-ui/react';

// CHANGE THIS TO CORRECT PATH ONCE PRODUCTS IS COMPLETE //
//import storeProducts from '../shop/Products';
const ShoppingCart: React.FC = () => {

    //const { products, total, isOpen, openCart, closeCart } = useState([]);

    return (
        <IconButton 
        aria-label='Shopping Cart' 
        icon={<Image boxSize='50px' 
        src="cart.png" />} />
    );
};

export default ShoppingCart;

/*
type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart ({ isOpen}: ShoppingCartProps) {
    cont { closeCart, cartItems } = useShoppingCart();
    return (
        <OffscreenCanvas show = {isOpen} onHide = {closeCart} placement = "end">
            <OffscreenCanvas.Header closeButton>
                <OffscreenCanvas.Title> Shopping Cart </OffscreenCanvas.Title>
            </OffscreenCanvas.Header>
            <OffscreenCanvas.Body>
                <Stack
            </OffscreenCanvas.Body>
        </OffscreenCanvas>
    );
}


*/

/*
// this is in app.js??//

const [cart, setCart] = useState ([]);
const [total, setTotal] = useState(0);

const addToCart = (productId, variantInfo) => {

    if(variantInfo)

}
*/

