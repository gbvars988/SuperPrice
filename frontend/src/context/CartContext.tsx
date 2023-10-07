import React from "react";
import { IProduct } from '../features/product/ProductInfo';

//export interface CartItem extends IProduct {
export type CartItem = {
  productID: string;
  name: string;
  description: string;
  weight: number;
  quantity: number;
  price: number;
  supermarketName: string;
  imageURL: string;
};

export type CheckoutInfo = {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  deliveryOption: string;
  deliveryTime: string;
  orderId: number;
};


export type CartContextType = {
  cartItems: CartItem[];
  checkoutInfo: CheckoutInfo | null;
  setCheckoutInfo: (info: CheckoutInfo) => void;
  //setProducts(cartItems: CartItem[]): void;
  addToCart: (item: CartItem) => void;
  increaseProductQty: (item: CartItem) => void;
  decreaseProductQty: (item: CartItem) => void;
  //removeFromCart: (productID: string) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
};

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  checkoutInfo: null,
  setCheckoutInfo: () => {},
  //setProducts: () => {},
  addToCart: () => {},
  increaseProductQty: () => {},
  decreaseProductQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [checkoutInfo, setCheckoutInfo] = React.useState<CheckoutInfo | null>(
    null,
  );


  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productID === item.productID,
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.productID === item.productID
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
        //, updateQuantity(item, item, item.quantity);
      }
      return [...prevItems, item];
    });


  };

  const updateQuantity = (
    currentProduct: CartItem,
    targetProduct: CartItem,
    quantity: number
  ): CartItem => {
    if (currentProduct.productID === targetProduct.productID) {
      return Object.assign({
        ...currentProduct,
        quantity: currentProduct.quantity + quantity,
      });
    } else {
      return currentProduct;
    }
  };

  const increaseProductQty = (productToIncrease: CartItem) => {
    const updatedProducts = cartItems.map((product: CartItem) => {
      return updateQuantity(product, productToIncrease, +1);
    });

    setCartItems(updatedProducts);
    //updateCartTotal(updatedProducts);
  };

  const decreaseProductQty = (productToDecrease: CartItem) => {
    const updatedProducts = cartItems.map((product: CartItem) => {
      return updateQuantity(product, productToDecrease, -1);
    });

    setCartItems(updatedProducts);
    //updateCartTotal(updatedProducts);
  };

/*
  const removeFromCart = (item: CartItem) => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => i.item !== item),
    );

    
  };
*/
  const removeFromCart = (productToRemove: CartItem) => {
    const updatedProducts = cartItems.filter(
      (product: CartItem) => product.productID !== productToRemove.productID
    );

    setCartItems(updatedProducts);
    //updateCartTotal(updatedProducts);
  };




  const clearCart = () => {
    setCartItems([]);
  };



  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkoutInfo,
        setCheckoutInfo,
        addToCart,
        removeFromCart,
        increaseProductQty,
        decreaseProductQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
