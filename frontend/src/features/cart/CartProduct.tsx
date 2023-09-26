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

import MinusQty from './minus.png';
import PlusQty from './plus.png';

import { ICartProduct } from '../../context/cart-context/CartProdContext'

import useCart from '../cart/useCart'

/*
export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface ICartTotal {
  productQuantity: number;
  installments: number;
  totalPrice: number;
  currencyId: string;
  currencyFormat: string;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
  };
}
*/
interface IProps {
  product: ICartProduct;
}

/*type CartProductProps = {
    name: string
    description: string
    quantity: number
    price: number
    imageURL: string
    onClickDelete?: () => void
}
*/

//export const CartProduct = (props: CartProductProps) => {
const CartProduct = ({ product }: IProps) => {
  
  const { removeProduct, increaseProductQty, decreaseProductQty } = useCart();

  const {
    name,
    description,
    weight,
    imageURL,
    supermarketPrices: price,
    quantity,
  } = product

    const handleRemoveProduct = () => removeProduct(product);
    const handleIncreaseProductQuantity = () => increaseProductQty(product);
    const handleDecreaseProductQuantity = () => decreaseProductQty(product);
  
    return (
      <Box>
        <Button 
          onClick={handleRemoveProduct}
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
        {product.supermarketPrices[0].price}
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