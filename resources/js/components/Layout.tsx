import React from "react";
import { PropsWithChildren } from "react";
import { VStack, Container, Box } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container
      display="flex"
      maxW="container.xxl"
      minH="100vh"
      px={{ base: 4, md: 0 }}
      centerContent
    >
      <VStack flex={1} spacing={8} alignItems="stretch" w="full">
        <Navbar />
        <Box flex={1} w="full" as="section">
          <VStack spacing={16} w="full">
            {children}
          </VStack>
        </Box>
        <Footer />
      </VStack>
    </Container>
  );
};

export default Layout;
