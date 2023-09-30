import React from "react";

export type CartItem = {
  productID: string;
  name: string;
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
};

export type CartContextType = {
  cartItems: CartItem[];
  checkoutInfo: CheckoutInfo | null;
  setCheckoutInfo: (info: CheckoutInfo) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productID: string) => void;
  clearCart: () => void;
};

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  checkoutInfo: null,
  setCheckoutInfo: () => {},
  addToCart: () => {},
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
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (productID: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => i.productID !== productID),
    );
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
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
