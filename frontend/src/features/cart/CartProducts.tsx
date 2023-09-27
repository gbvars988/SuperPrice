import { Container, 
  Box
} from '@chakra-ui/react';
import { useContext } from 'react';

import { CartContext, CartContextType, CartItem, CartProvider, CheckoutInfo } from '../../context/CartContext';

//import { ICartProduct } from '../../context/cart-context/CartProdContext'
import CartProduct from './CartProduct';


interface IProps {
  cartItems: CartItem[];
  checkoutInfo: CheckoutInfo | null;
  setCheckoutInfo: (info: CheckoutInfo) => void;
  //setProducts(cartItems: CartItem[]): void;
  addToCart: (item: CartItem) => void;
  increaseQty: (item: CartItem) => void;
  decreaseQty: (item: CartItem) => void;
  //removeFromCart: (productID: string) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}


const { cartItems } = useContext(CartContext);

const CartProducts = ({ cartItems }: CartContextType) => {
  return (
    <Container>
      {cartItems?.length ? (
        cartItems.map((p) => <CartProduct  product={p} key={p.name} />)
      ) : (
        <Box>
          
        </Box>
      )}
    </Container>
  );
};

export default CartProducts;
