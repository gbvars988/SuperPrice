import React, { useContext } from 'react';
import {Box, 
    Button, 
    Heading, 
    VStack, 
    Flex,
    Text,
    Center} from '@chakra-ui/react';

import { LABEL, PATH } from "../../language";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import { CartSummary } from './CartSummary';
import { CartContext, CartItem } from "../../context/CartContext";


const EditCart: React.FC = () => {
    const { cartItems } = useContext(CartContext);
    
    const navigate = useNavigate();

    const TotalCartItems = () => {
        return cartItems
          .reduce((ttl: number, item: CartItem) => ttl + item.quantity, 0)
          .toFixed(0);
      };
    
    return (
        
        <PageContainer>
            <Button ml='50px' 
                mb='30px' 
                onClick={() => {navigate(PATH.SHOP);}}>
                Keep Shopping
            </Button>
            <VStack spacing={8} 
                align="center">
                <Box>
                    <Heading as="h1" 
                        size="xl" 
                        textAlign="center" 
                        lineHeight="40px">
                        {LABEL.EDIT_CART}
                    </Heading>
                </Box>
                <Box>
                </Box>
                <Box maxW={"8xl"} 
                    px={7}>
                <Flex align='center' 
                    w='98%' 
                    justifyContent='space-between' 
                    marginBottom={'10px'} 
                    mt='4px'>
                
                    <CartSummary/>
                    </Flex>
                </Box>
                <Center>
                {TotalCartItems() !== '0' &&
                <Center>
                    <Box mt='50px'>
                        <Button colorScheme="teal"
                            onClick={() => {navigate(PATH.CHECKOUT);}}>
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Center>
                }
                {TotalCartItems() === '0' &&
                        <Box alignItems='center'
                            justifyContent='space-between'
                            width='100%'>
                            <Text marginBottom='50px'
                                fontWeight='bold'
                                fontSize='15px'>
                                Your cart is empty.
                            </Text>
                            <Button alignItems='center'
                                justifyContent='center'
                                aria-label='Start Shopping'
                                colorScheme='teal'
                                size='md'
                                ml='15px'
                                onClick={() => {navigate(PATH.SHOP);}}>
                                Shop Now
                            </Button>
                        </Box>
                    }
                    </Center>
            </VStack>
        </PageContainer>
    );
};

export default EditCart;
