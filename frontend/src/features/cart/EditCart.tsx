import React from 'react';
import {Box, Button, Heading, Image, VStack, Text} from '@chakra-ui/react';
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
                    <Heading as="h1" size="2xl" textAlign={"center"} lineHeight={"60px"}>
                        {LABEL.EDIT_CART}
                    </Heading>
                </Box>
                <Box>
                    <Text> Meow</Text>
                </Box>
                <Box>
                    <CartSummary/>
                </Box>
            </VStack>
        </PageContainer>
    );
};

export default EditCart;
