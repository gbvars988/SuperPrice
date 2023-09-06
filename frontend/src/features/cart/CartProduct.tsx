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
    useDisclosure,
    Center,
    Select,
    SelectProps,
    useColorModeValue
} from '@chakra-ui/react';

type CartProductProps = {
    name: string
    description: string
    quantity: number
    price: number
    imageURL: string
    onChangeQty?: (quantity: number) => void
    onClickDelete?: () => void
}

const QuantitySelect = (props: SelectProps) => {

    return (
        <Select
        maxW="64px"
        aria-label="Select quantity"
        focusBorderColor={useColorModeValue('teal.500', 'teal.200')}
        {...props}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Select>
    )
}

export const CartProduct = (props: CartProductProps) => {
    const {
      name,
      description,
      quantity,
      imageURL,
      price,
      onChangeQty,
      onClickDelete,
    } = props
  
    return (
        /*<CartProductDeets
          name={name}
          description={description}
          image={imageURL}
        />
        */
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQty?.(+e.currentTarget.value)
          }}
        />
        //price={price}
        //<CloseButton aria-label={`Delete ${name} from cart`} onClick={onClickDelete} />
    )
  }