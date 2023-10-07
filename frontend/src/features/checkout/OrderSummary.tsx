import React, { useContext } from 'react';
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
import { LABEL, PATH } from "../../language";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import { CartContext } from '../../context/CartContext';
import CheckoutForm  from './CheckoutForm';
import PaymentForm from './PaymentForm';
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
    const { checkoutInfo, cartItems, clearCart } = useContext(CartContext)
    const calculateTotal = () => {
        return cartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2);
      };

    
    return (
        
        <PageContainer>
            
                <Box>
                    <Heading as="h1" size="xl" textAlign={"center"} lineHeight={"40px"}>
                        {LABEL.ORDER_SUMMARY}
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
                        {cartItems.map((item) => (
                            <React.Fragment>
                                    <Box>
                                    <Flex align="flex-end" 
                            alignItems='center' 
                            width='100px'>
                            <Image src={item.imageURL} 
                                alt={item.name} 
                                boxSize='20px' 
                                className="rounded-md h-24" 
                                borderRadius='10px' 
                                marginRight={'8px'} 
                                align='center'/>
                            <Text fontSize='15px' 
                                mr='25px'>
                                {item.name}
                            </Text>
                        </Flex>
                                {item.quantity}</Box>
                                
                            CART SUMMARY GOES HERE                            
                            </React.Fragment>
                            ))}
                        </AccordionPanel>
                    
                    </AccordionItem>
                    </Accordion>
                </Center>
                <br/>


                <OrderSummaryItem label="Subtotal $0.00" />
                    Total: ${calculateTotal()}
                <br/>

                <Text fontSize="xl" fontWeight="extrabold">
                
                </Text>
                <Box display="flex" justifyContent="center" mt={10}>
                    <Button
                    onClick={() => {navigate(PATH.HOMEPAGE);}}>
                    Return Home
                    </Button>
                </Box>
                
                
        </PageContainer>
        
        
    );
    clearCart();
};

/*                
                {checkoutInfo.map((order) => (
                                <React.Fragment>
                                    <Flex align='center'
                                    w='80%'>
                                        Delivery is set for: {order.deliveryOption}
                                        Your delivery time is confirmed to be: e{order.deliveryTime}
                                    </Flex>
                                </React.Fragment>
                            ))}
                            
                                            <Center><Text>Delivery:</Text></Center>
                <OrderSummaryItem label="Coupon Amount $">
                </OrderSummaryItem>
                <Flex justify="center" mt='50px'>
                <Text fontSize="xl" fontWeight="semibold">
                    Total: ${CartTotal + delivery}
                </Text>
                            
                            */