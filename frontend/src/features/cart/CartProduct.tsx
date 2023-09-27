import React from 'react';
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
    IconButtonProps, 
    Image,
    Button, 
    Box,
    Input,
    useDisclosure,
    Center,
    Select,
    SelectProps,
    useColorModeValue,
    Container
} from '@chakra-ui/react';
import { useContext } from 'react';

import MinusQty from './minus.png';
import PlusQty from './plus.png';

//import { ICartProduct } from '../../context/cart-context/CartProdContext'
import { CartContext, CartContextType, CartItem } from '../../context/CartContext';
import useCart from './useCart'

const { cartItems } = useContext(CartContext);

export interface ICartProduct extends CartItem {
  quantity: number;
}
/*
export interface ICartTotal {
  productQuantity: number;
  installments: number;
  totalPrice: number;
  currencyId: string;
  currencyFormat: string;
}

export interface IGetProductsResponse {
  data: {
    product: CartItem[];
  };
}


type CartProductProps = {
    name: string
    description: string
    quantity: number
    price: number
    imageURL: string
    onClickDelete?: () => void
}
*/
interface IProps {
  product: CartItem;
}


//export const CartProduct = (props: CartProductProps) => {
//const { cartItems } = useContext(CartContext);

const CartProduct = ({ product}: IProps) => {
  
  //const { removeFromCart, increaseQty, decreaseQty } = useCart();
  const { removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);


  const {
    productID,
    name,
    description,
    weight,
    imageURL,
    price,
    quantity,
  } = product

    const handleRemoveFromCart = () => removeFromCart(product);
    const handleIncreaseProductQuantity = () => increaseQty(product);
    const handleDecreaseProductQuantity = () => decreaseQty(product);
  
    return (
      <Box>
        <Button 
          onClick={handleRemoveFromCart}
          title='remove from cart'>
          x
        </Button>
        <Image
          src={require(`static/products/${name}-1-cart.webp`)}
          alt={name}/>
        <Container
          width={'50%'}
          display={'inline-block'}
          verticalAlign={'middle'}
          >
            {name}
            {description}
            {weight}
            Quantity: {quantity}
        </Container>
        {price}
        <Box>
        <IconButton
          {...handleDecreaseProductQuantity}
          w='15px'
          m='5px'
          size='sml'
          aria-label='Decrease Qty' 
          icon={<Image src={MinusQty}
          boxSize='10px'/>}/>
      <IconButton
          {...handleIncreaseProductQuantity}
          w='15px'
          mt='5px'
          mb='5px'
          ml='2px'
          size='sml'
          aria-label='Increase Qty'  
          icon={<Image src={PlusQty}
          boxSize='10px'/>}/>

        </Box>
        

      </Box>
    )
  };

  export default CartProduct;
  