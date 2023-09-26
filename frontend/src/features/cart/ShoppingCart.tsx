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


