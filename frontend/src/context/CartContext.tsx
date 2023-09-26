import React from 'react';

export type CartItem = {
    productID: string;
    name: string;
    quantity: number;
    price: number;
    supermarketName: string;
    imageURL: string;
};

export type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productID: string) => void;
    clearCart: () => void;
};

export const CartContext = React.createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    clearCart: () => {
    },
});

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.productID === item.productID);
            if (existingItem) {
                return prevItems.map(i =>
                    i.productID === item.productID
                        ? {...i, quantity: i.quantity + item.quantity}
                        : i
                );
            }
            return [...prevItems, item];
        });
    };

    const removeFromCart = (productID: string) => {
        setCartItems(prevItems => prevItems.filter(i => i.productID !== productID));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};
