//import { useCartContext } from '../../context/cart-context/CartContext';
//import useCartProds from '../../context/cart-context/useCartProds';
import { useContext } from 'react';

import { CartContext, CartContextType, CartItem } from '../../context/CartContext';
//import cartTotal from './cartTotal';

const useCart = () => {
  const {
    cartItems,
    checkoutInfo,
    setCheckoutInfo,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  //const { total, updateCartTotal } = cartTotal();

  //const openCart = () => setIsOpen(true);
  //const closeCart = () => setIsOpen(false);

  return {
    //isOpen,
    //openCart,
    //closeCart,
    cartItems,
    checkoutInfo,
    setCheckoutInfo,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  };
};

export default useCart;