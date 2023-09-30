import React,  { useContext } from 'react';
import {
    Heading, 
    IconButton, 
    Box, 
    Image,
    Text,
    Flex,
    Input,
    useNumberInput,
    Button
} from '@chakra-ui/react';
import MinusQty from './minus.png';
import PlusQty from './plus.png';
import { CartContext, CartItem } from '../../context/CartContext';
import { CartTotal, TotalCartItems } from './cartTotal';


export const CartSummary = () => {
    //const { cartItems } = useContext(CartContext);
    const { cartItems, checkoutInfo, addToCart, increaseProductQty, decreaseProductQty, removeFromCart, clearCart } = useContext(CartContext);

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
        {cartItems.map((item) => (
        
            <React.Fragment>
            
        
            <Flex align='center' w='100%' justifyContent='space-between' marginBottom={'10px'} mt='4px' borderBottom='1px' borderColor='blackAlpha.300'>
                
                <Flex align="flex-end" alignItems='center' width='100px'>
                    <Image src={item.imageURL} alt={item.name} boxSize='20px' className="rounded-md h-24" borderRadius='10px' marginRight={'8px'} align='center'/>
                    <Text fontSize='15px'  mr='25px'>{item.name}</Text>
                </Flex>
                
                <Flex w='80px' align='left' justify="center"  key={item.productID}>

                        {item.quantity > 0 &&
                        <IconButton
                            {...dec}
                            w='12px'
                            m='2px'
                            size='sml'
                            aria-label='Decrease Qty' 
                            onClick={() => {
                                decreaseProductQty(item);}}
                            icon={<Image src={MinusQty}
                            boxSize='10px'/>}/>
                        }
                        <Input m='2px'{...input} size='xs' border='none' w='25px' justifyContent={'left'} value={item.quantity}></Input> 
                        <IconButton
                            {...inc}
                            w='12px'
        
                            mt='2px'
                            mb='2px'
                            ml='2px'
                            size='sml'
                            aria-label='Increase Qty'
                            onClick={() => {
                                increaseProductQty(item);}}  
                            icon={<Image src={PlusQty}
                            boxSize='10px'/>}/>
                    
                        
                    </Flex>
                    <Flex>
                        <Text ml='8px' fontSize='12px' fontWeight='bold'>${item.price.toFixed(2)}</Text> 
                    </Flex>
                    <Button 
                            justifyContent='center'
                            colorScheme='whiteAlpha' 
                            ml='20px'
                            size='xxs'
                            width='19px'
                            height='19px'
                            fontWeight='bold'
                            variant={'outline'}
                            aria-label='Remove from Cart'
                            _focus={{bg: 'white'}}
                            onClick={() => {
                                
                                removeFromCart(item);}}>
                            X
                        </Button>    
                </Flex>

            
                </React.Fragment>
            ))}
            <Flex align='center' justifyContent='center'>
                    <Heading  alignSelf='center' 
                        as='h1'
                        size="md"
                        mt='25px'>
                        Total: ${CartTotal()}
                        </Heading>
            </Flex>
                </Box>

                
                
                  
                  
            

        
    )


}

/*

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



            <div className="flex flex-col">
                    <h1 className="text-lg font-bold">{item.name}</h1>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      addToCart(item)
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      removeFromCart(item)
                    }}
                  >
                    -
                  </button>
                </div>
              </div>

            */