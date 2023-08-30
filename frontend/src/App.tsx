import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Router from "./routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" >
      <Grid minH="100vh" p={3}>
        {/*Keep the color switcher here for now - refactor into nav bar when that gets created*/}
        <ColorModeSwitcher justifySelf="flex-end" />
        <Router />
      </Grid>
    </Box>
  </ChakraProvider>
)
