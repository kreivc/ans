import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

render(
  <ChakraProvider>
    <ColorModeScript initialColorMode="light" />
    <App />
  </ChakraProvider>,
  document.getElementById("app")
);
