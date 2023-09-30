import React from 'react';
import {Box, 
    Button, 
    Heading, 
    VStack, 
    Center} from '@chakra-ui/react';

import {LABEL, PATH} from "../../language";
import {useNavigate} from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import { CartSummary } from './CartSummary';


const EditCart: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        
        <PageContainer>
            
            <VStack spacing={8} align={"center"}>
                <Box>
                    <Heading as="h1" size="xl" textAlign={"center"} lineHeight={"40px"}>
                        {LABEL.EDIT_CART}
                    </Heading>
                </Box>
                <Box>

                </Box>
                <Box>
                    <CartSummary/>
                </Box>
                <Center>
                <Box mt='50px'>
                    <Button colorScheme="teal" onClick={() => {
                        
                    }}
                    >Proceed to Checkout</Button>
                </Box>
                </Center>
            </VStack>
        </PageContainer>
    );
};

export default EditCart;
