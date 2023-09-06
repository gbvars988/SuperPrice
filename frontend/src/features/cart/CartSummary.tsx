import React from 'react';
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
    ButtonGroup,
    Box, 
    Image,
    Button, 
    useDisclosure,
    Center,
    VStack,
    Text,
    Flex
} from '@chakra-ui/react';

export const CartSummary = () => {

    return (
        <Box>
        <Flex align='center' w='100%' justifyContent='space-between'>
            <Flex align="flex-end">
                <Text>Product 1</Text> 
            </Flex>
            <Flex w='30px' align='left' justify="center">
                <Text>0</Text> 
            </Flex>
            <Box>
                <Text>$0.00</Text> 
            </Box>
        </Flex>
        <Flex align='center' 
            w='100%'
            justifyContent='space-between'>
            <Flex align="flex-end">
                <Text>Product 2</Text> 
            </Flex>
            <Flex w='30px' align='left' justify="center">
                <Text>0</Text> 
            </Flex>
            <Box>
                <Text>$0.00</Text> 
            </Box>
        </Flex>
        <Flex align='center' 
            w='100%'
            justifyContent='space-between'>
            <Flex align="flex-end">
                <Text>Product 3</Text> 
            </Flex>
            <Flex w='30px' align='left' justify="center">
                <Text>0</Text> 
            </Flex>
            <Box>
                <Text>$0.00</Text> 
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