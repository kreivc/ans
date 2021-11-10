import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  return (
    <Box>
      <Text>Init Ans 2</Text>
      <Button>Test</Button>
    </Box>
  );
};

export default App;
