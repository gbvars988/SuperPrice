import { useCartContext } from './CartContext';
import useCartTotal from '../../features/cart/cartTotal';
import { ICartProduct } from './CartProdContext';

const useCartProds = () => {
  const { products, setProducts } = useCartContext();
  const { updateCartTotal } = useCartTotal();

  const updateQuantitySafely = (
    currentProduct: ICartProduct,
    targetProduct: ICartProduct,
    quantity: number
  ): ICartProduct => {
    if (currentProduct.name === targetProduct.name) {
      return Object.assign({
        ...currentProduct,
        quantity: currentProduct.quantity + quantity,
      });
    } else {
      return currentProduct;
    }
  };

  const addProduct = (newProduct: ICartProduct) => {
    let updatedProducts;
    const isProductAlreadyInCart = products.some(
      (product: ICartProduct) => newProduct.name === product.name
    );

    if (isProductAlreadyInCart) {
      updatedProducts = products.map((product: ICartProduct) => {
        return updateQuantitySafely(product, newProduct, newProduct.quantity);
      });
    } else {
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const removeProduct = (productToRemove: ICartProduct) => {
    const updatedProducts = products.filter(
      (product: ICartProduct) => product.name !== productToRemove.name
    );

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const increaseProductQty = (productToIncrease: ICartProduct) => {
    const updatedProducts = products.map((product: ICartProduct) => {
      return updateQuantitySafely(product, productToIncrease, +1);
    });

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const decreaseProductQty = (productToDecrease: ICartProduct) => {
    const updatedProducts = products.map((product: ICartProduct) => {
      return updateQuantitySafely(product, productToDecrease, -1);
    });

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  return {
    products,
    addProduct,
    removeProduct,
    increaseProductQty,
    decreaseProductQty,
  };
};

export default useCartProds;