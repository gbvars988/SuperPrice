import React, { useContext } from 'react';

import {
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    IconButton, 
    Flex,
    Badge,
    ButtonGroup,
    Box, 
    Image,
    Button, 
    useDisclosure,
    Text,
} from '@chakra-ui/react';


import cartImage from './cart.png'
import {LABEL, PATH} from "../../language";
import {useNavigate} from "react-router-dom";
import { CartSummary } from './CartSummary';
import { CartContext, CartItem } from '../../context/CartContext';


function CartDrawer() {
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);
    
    const totalItems = () => {
        return cartItems
            .reduce((ttl: number, item: CartItem) => ttl + item.quantity, 0)
            .toFixed(0);
    }

    


    return (
        <>
            <Button 
                //ref = {btnRef}
                aria-label='Shopping Cart'  
                
                onClick={onOpen}
                leftIcon={<Image src={cartImage}
                boxSize='28px'
                />}>
                    {totalItems() != '0' &&
                    <Box 
                        as="button"
                        width="16px"
                        height="14px"
                        borderRadius="50%"
                        bg="#2A7061"
                        position="absolute"
                        marginBottom="15px"
                        marginLeft='10px'
                        fontWeight="bold"
                        fontSize="11px">
                    {totalItems()}
                    </Box>
                    }
            </Button>
            
            <Drawer
                isOpen = {isOpen}
                placement = 'right'
                onClose = {onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <Box 
                        alignItems='center'
                        justifyContent='center'
                       >
                        <Text align={"center"}>
                            <DrawerHeader
                                mt='25px'
                                mb='5px'>
                                {LABEL.YOUR_CART}
                            </DrawerHeader>
                        </Text>
                        <DrawerBody border='10px'>
                        <Flex align='center' w='100%' justifyContent='space-between' marginBottom={'10px'} mt='4px'>
                        {totalItems() != '0' &&    
                            <CartSummary/>
                }
                        </Flex>
                        </DrawerBody>
                    </Box>
                    <DrawerFooter>
                    {totalItems() != '0' &&
                        <Box
                            alignItems='center'
                            justifyContent='center'
                            width='98%'
                            height='15%'>
                            <ButtonGroup variant='outline' spacing='6'>
                                <Button
                                    aria-label='Edit Cart'
                                    size='md'
                                    leftIcon={<Image 
                                                src={cartImage}
                                                boxSize='15px'/>}
                                    onClick={() => {navigate(PATH.CART);
                                                    onClose();}}>
                                    Edit Cart
                                </Button>
                                <Button
                                    aria-label='Check Out'
                                    colorScheme='teal'
                                    size='md'>
                                    Checkout
                                </Button>
                            </ButtonGroup>
                        </Box>
                    }
                    {totalItems() == '0' &&

                    
                        <Box alignItems='center'
                            justifyContent='space-between'
                            width='73%'>
                       <Text 
                            mb='20px' 
                            fontWeight='bold'
                            fontSize='15px'>Your cart is empty.</Text>
                    
                       
                       <Button
                            alignItems='center'
                            justifyContent='center'
                            aria-label='Start Shopping'
                            colorScheme='teal'
                            size='md'
                            ml='15px'
                            onClick={() => {navigate(PATH.SHOP); 
                                onClose();}}>
                            Shop Now
                        </Button>
                        </Box>
                       
                    }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CartDrawer


