import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Router from "./routes";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

export const App = () => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </UserProvider>
  </ChakraProvider>
);
