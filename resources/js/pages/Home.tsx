import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const Home = () => {
  const navigate = useNavigate();
  return (
    <MotionBox
      minH="calc(100vh - 61.2px - 56px)"
      d="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: -50 }}
      transition={{ duration: 1 }}
    >
      <VStack spacing="5">
        <Flex maxW="xl" flexWrap="wrap" justifyContent="center">
          <Heading fontSize="5xl" color="blackAlpha">
            You have a question?
          </Heading>
          <Heading fontSize="5xl" color="brand.500">
            We have the ANS
          </Heading>
        </Flex>
        <Flex maxW="xl" flexWrap="wrap" justifyContent="center">
          <Text color="gray.500" textAlign="center">
            ANS is a simple and accessible forum for all you need. ANS provide
            all level solution from beginer to advance question.
          </Text>
        </Flex>
        <Flex gridGap="3">
          <Button
            size="md"
            colorScheme="brand"
            color="white"
            shadow="md"
            onClick={() => navigate("/explore")}
          >
            Explore Now
          </Button>
          <Button
            size="md"
            colorScheme="whiteAlpha"
            color="brand.500"
            shadow="md"
            onClick={() => navigate("/ask")}
          >
            Ask Now
          </Button>
        </Flex>
      </VStack>
    </MotionBox>
  );
};

export default Home;
