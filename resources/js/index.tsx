import React from "react";
import "./utils/global.module.css";
import { render } from "react-dom";
import theme from "./utils/theme";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("app")
);
