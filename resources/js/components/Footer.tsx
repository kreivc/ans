import React from "react";
import { Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box pb={8} as="footer" textAlign="center">
      <small>&copy; Copyright {new Date().getFullYear()}, ANS</small>
    </Box>
  );
}
