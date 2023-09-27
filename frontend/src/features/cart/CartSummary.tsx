import React,  { useContext } from 'react';

import {LABEL, PATH} from "../../language";
import {useNavigate} from "react-router-dom";
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
    Container,
    ButtonGroup,
    Box, 
    Image,
    Button, 
    useDisclosure,
    Center,
    VStack,
    Text,
    Flex,
    NumberInput,
    Input,
    useNumberInput
} from '@chakra-ui/react';
import MinusQty from './minus.png';
import PlusQty from './plus.png';
import { CartContext, CartItem, CartContextType, CartProvider } from '../../context/CartContext';

import CartProducts from './CartProducts';

import useCart from './useCart';

//const { cartItems, removeFromCart } = useContext(CartContext);

export const CartSummary = () => {
    //const { cartItems } = useContext(CartContext);
    //const { cartItems, checkoutInfo, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
    const { cartItems } = useContext(CartContext);

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 100
    })

    
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        
        <Box>
        
        <Flex align='center' w='100%' justifyContent='space-between'>



            <Flex align="flex-end">
                <Text mr='25px'>Product 1</Text> 
            </Flex>
            <Flex w='80px' align='left' justify="center">
                <Box>
                <IconButton
                    {...dec}
                    w='15px'
                    m='5px'
                    size='sml'
                    aria-label='Decrease Qty' 
                    icon={<Image src={MinusQty}
                    boxSize='10px'/>}/>
                <Input m='2px'{...input} size='xs' border='none' w='25px' justifyContent={'left'}/> 
                <IconButton
                    {...inc}
                    w='15px'
                    mt='5px'
                    mb='5px'
                    ml='2px'
                    size='sml'
                    aria-label='Increase Qty'  
                    icon={<Image src={PlusQty}
                    boxSize='10px'/>}/>
                    </Box>
            </Flex>
            <Box>
                <Text ml='25px'>$0.00</Text> 
            </Box>
        </Flex>
        

        <Text align={"center"}>
            <Heading 
                as='h1'
                size="md"
                mt='25px'>
                {LABEL.TOTAL_PRICE}0.00
            </Heading>
        </Text>  

       
        </Box>
    )


}