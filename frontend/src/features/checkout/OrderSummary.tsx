import React from 'react';
import {Box, 
    Button, 
    Heading, 
    Image, 
    Stack, 
    Text, 
    Flex, 
    Link,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Center,
    IconButton} from '@chakra-ui/react';
import { 
    AddIcon, 
    MinusIcon,
    ChevronRightIcon} from '@chakra-ui/icons';
import {LABEL, PATH} from "../../language";
import {useNavigate} from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
//import { CartSummary } from './CartSummary';
//import { CartProduct } from './CartProduct';
import MinusQty from './minus.png';
import PlusQty from './plus.png';

type OrderSummaryItemProps = {
    label: string
    value?: string
    children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
    const { label, value, children } = props
    return (
      <Flex marginTop='50px' justify="center" fontSize="m">
        <Text fontWeight="medium" >
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }

export const OrderSummary: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        
        <PageContainer>
                <Box>
                    <Heading as="h1" size="xl" textAlign={"center"} lineHeight={"40px"}>
                        {LABEL.ORDER_SUM}
                    </Heading>
                </Box>
                <br />
                <br/>
                    <Center>
                    <Accordion alignItems='Center' justifyContent="center"  maxWidth='250px' allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                            View Contents of Order
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            CART SUMMARY GOES HERE
                        </AccordionPanel>
                    
                    </AccordionItem>
                    </Accordion>
                </Center>

                <OrderSummaryItem label="Subtotal $0.00" />
                <OrderSummaryItem label="Shipping + Tax">
                <Link href="#" textDecor="underline" ml='20px'>
                    Calculate shipping
                </Link>
                </OrderSummaryItem>
                <OrderSummaryItem label="Coupon Code">
                <Link href="#" textDecor="underline" ml='20px'>
                    Add coupon code
                </Link>
                </OrderSummaryItem>
                <Flex justify="center" mt='50px'>
                <Text fontSize="xl" fontWeight="semibold">
                    Total $0.00
                </Text>
                <Text fontSize="xl" fontWeight="extrabold">
                    
                </Text>
                
                </Flex>
                <Center>
                <Box mt='50px'>
                    <Button colorScheme="teal" onClick={() => {
                        
                    }}
                    >Confirm Order</Button>
                </Box>
                </Center>
        </PageContainer>
    );
};

