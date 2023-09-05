import React from 'react';

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
    ButtonGroup,
    IconButtonProps, 
    Image,
    Button, 
    useDisclosure,
    Center
} from '@chakra-ui/react';
import { 
    AddIcon, 
    MinusIcon 
} from '@chakra-ui/icons'
import cartImage from './cart.png'


// CHANGE THIS TO CORRECT PATH ONCE PRODUCTS IS COMPLETE //
//import cartProducts from '../cart/CartProducts';

//type CartDrawerButton = Omit<IconButtonProps, "aria-label">
//function ShoppingCartDrawer() {

//export const CartButton: React.FC = () => {
//export const CartButton = () => {
function CartDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton 
                //ref = {btnRef}
                aria-label='Shopping Cart'  
                onClick={onOpen}
                icon={<Image src={cartImage}
                boxSize='28px'
                />}>
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
                    <DrawerHeader>Your Shopping Cart:</DrawerHeader>
                    <DrawerBody>
                        
                        <p>Product 2</p>
                        <p>Product 2</p>
                        <p>Product 3</p>
                        <p> </p>
                        <p> </p>
                        <b>Total Price: $0.00</b>
                    </DrawerBody>
                    <DrawerFooter>
                        
                        <Button
                            aria-label='Check Out'
                            colorScheme='teal'
                            size='md'

                            >
                                Checkout
                            </Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CartDrawer


