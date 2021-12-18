import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";

export default function SearchResult() {
  const MotionBox = motion(Box);
  const location = useLocation();
  return (
    <Flex direction="column" w="100%" alignItems="center">
      <Heading fontSize="3xl" color="black" py={2}>
        Search results for {location.state.keyword}
      </Heading>

      <MotionBox
        w="100%"
        maxW="container.lg"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {location.state.result.question ? (
          location.state.result.question.map((data: any, id: any) => (
            <Box key={id} flexGrow={1}>
              <QuestionCard data={data} />
            </Box>
          ))
        ) : (
          <Text>No result found</Text>
        )}
      </MotionBox>
    </Flex>
    // </Box>
  );
}
