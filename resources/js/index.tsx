import React from "react";
import "./utils/global.css";
import { render } from "react-dom";
import theme from "./utils/theme";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("app")
);
