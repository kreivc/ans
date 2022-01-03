import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <VStack
      p="20"
      alignItems="center"
      justifyContent="center"
      spacing={{ base: "25px", md: "4" }}
      textAlign="center"
    >
      <Heading size="4xl">404</Heading>
      <Text fontSize="lg" fontWeight="bold">
        Page not found
      </Text>
      <Text fontSize="md">
        The link you clicked may be broken or the page may have been removed or
        renamed
      </Text>
      <Button
        colorScheme="brand"
        leftIcon={<HiArrowSmLeft color="white" />}
        onClick={() => navigate("/")}
      >
        Back to home
      </Button>
    </VStack>
  );
};

export default NotFound;
