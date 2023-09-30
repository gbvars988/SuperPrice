import React from 'react';

import {
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    IconButton, 
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


function CartDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    
    
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
                onClose = {onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <Box 
                        alignItems='center'
                        justifyContent='center'
                        width='98%'
                        >
                        <Text align={"center"}>
                            <DrawerHeader
                                mt='25px'
                                mb='5px'>
                                {LABEL.YOUR_CART}
                            </DrawerHeader>
                        </Text>
                        <DrawerBody border='20px'>
                            <CartSummary/>
                        </DrawerBody>
                    </Box>
                    <DrawerFooter>
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
                                    onClick={() => {navigate(PATH.CART);}}>
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
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CartDrawer


