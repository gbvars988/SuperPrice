import React from 'react';
import { createContext, useContext, useState } from "react";
//import { useShoppingCart } from '../context/ShoppingCartContext';
//import { CartProduct } from './CartProduct';
import {
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    Heading, 
    IconButton, 
    IconButtonProps, 
    Image, 
    useDisclosure
} from '@chakra-ui/react';

// CHANGE THIS TO CORRECT PATH ONCE PRODUCTS IS COMPLETE //
//import cartProducts from '../cart/CartProducts';

type CartDrawerButton = Omit<IconButtonProps, "aria-label">


export const CartButton: React.FC<CartDrawerButton> = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <IconButton 
                //ref = {btnRef}
                aria-label='Shopping Cart' 
                icon={<Image  
                    src='cart.png' 
                    boxSize='50px'
                    />} 
                onClick={onOpen}>

            </IconButton>
            
            <Drawer
                isOpen = {isOpen}
                placement = 'right'
                onClose = {onClose}
                //finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Your Cart Contents:</DrawerHeader>
                    <DrawerBody>
                        <p>Product 1:</p>
                        <p>Product 2:</p>
                        <p>Product 3:</p>
                    </DrawerBody>
                    <DrawerFooter>
                        <p>Total Price: $0.00</p>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};


