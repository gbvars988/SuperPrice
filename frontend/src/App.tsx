import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"
import Router from "./routes";
import {UserProvider} from "./context/UserContext";

export const App = () => (
    <ChakraProvider theme={theme}>
        <UserProvider>
            <Router/>
        </UserProvider>
    </ChakraProvider>
)
