import React from 'react';
import {Box, 
    Button, 
    Heading, 
    VStack, 
    Text,
    Center} from '@chakra-ui/react';

import {LABEL, PATH} from "../../language";
import {Link, useNavigate} from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import { CartSummary } from './CartSummary';


const EditCart: React.FC = () => {
    const navigate = useNavigate();
    
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
                <Box maxW={"8xl"} px={7}>
                    <CartSummary/>
                </Box>
                <Center>
                    <Box mt='50px'>
                        <Button colorScheme="teal"
                            onClick={() => {navigate(PATH.CHECKOUT);}}>
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Center>
            </VStack>
        </PageContainer>
    );
};

export default EditCart;
