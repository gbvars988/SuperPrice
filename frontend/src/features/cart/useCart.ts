import { useCartContext } from '../../context/cart-context/CartContext';
import useCartProds from '../../context/cart-context/useCartProds';
import cartTotal from './cartTotal';

const useCart = () => {
  const { isOpen, setIsOpen } = useCartContext();
  const {
    products,
    addProduct,
    removeProduct,
    increaseProductQty,
    decreaseProductQty,
  } = useCartProds();
  const { total, updateCartTotal } = cartTotal();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return {
    isOpen,
    openCart,
    closeCart,
    products,
    addProduct,
    removeProduct,
    increaseProductQty,
    decreaseProductQty,
    total,
    updateCartTotal,
  };
};

export default useCart;