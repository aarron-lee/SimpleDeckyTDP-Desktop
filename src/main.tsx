import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { setupGamepadEventListener } from "./controller/controllerListener.tsx";
import theme from "./utils/theme.tsx";

setupGamepadEventListener();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box minWidth={"500px"}>
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
