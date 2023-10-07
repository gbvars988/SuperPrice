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
                <Text align='center' marginTop='50px'>Thanks for your order, {checkoutInfo?.fullName}</Text>
                <Text align='center' marginTop='20px'>We have sent a confirmation to your email: <b>{checkoutInfo?.email}</b></Text>
                <br />
                <br/>
                    <Center>
                    
                    <Accordion alignItems='Center' justifyContent="center"  width='40%' allowToggle>
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
                                <Box justifyContent='center'>
                                    <Flex align="flex-end" 
                                        alignItems='center' 
                                        
                                        width='80%'>
                                    <Image src={item.imageURL} 
                                        alt={item.name} 
                                        boxSize='30px' 
                                        className="rounded-md h-24" 
                                        borderRadius='10px' 
                                        marginRight={'8px'} />
                            <Text fontSize='15px' 
                                mr='25px'>
                                {item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x {item.quantity}
                            </Text>
                        </Flex>
                                
                                </Box>
                                
                                                    
                            </React.Fragment>
                            ))}
                        </AccordionPanel>
                    
                    </AccordionItem>
                    </Accordion>
                    </Center>
                    <Center>
                <br/>
                <Text marginTop='50px'>Your order ID is: <b>{checkoutInfo?.orderId}</b></Text>
                
                    
                
                </Center>
                
                <Text marginTop='50px' align='center' fontSize="xl" fontWeight="bold">
                Total: ${calculateTotal()}
                </Text>
                <Box display="flex" justifyContent="center" mt={10}>
                    <Button
                    onClick={() => {navigate(PATH.HOMEPAGE); clearCart()}}>
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