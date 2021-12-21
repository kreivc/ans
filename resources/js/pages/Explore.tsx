import {
  Box,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard, { QuestionCardProps } from "../components/QuestionCard";

const Explore = () => {
  const location = useLocation();
  const allQuestion = location.state.result.questions as QuestionCardProps[];
  const allTags = location.state.result.tags;
  const MotionBox = motion(Box);

  return (
    <HStack
      justifyContent="space-between"
      w="full"
      maxW="container.xl"
      mx="auto"
      px="20"
      alignItems="flex-start"
    >
      <MotionBox
        flexGrow={4}
        mr="9"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading fontSize="3xl" color="black" py={2}>
          Explore
        </Heading>
        {allQuestion ? (
          allQuestion.map((data, id) => (
            <Box key={id}>
              <QuestionCard {...data} />
            </Box>
          ))
        ) : (
          <Text>No result found</Text>
        )}
      </MotionBox>
      <MotionBox
        flexGrow={1}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading fontSize="3xl" color="black" py={2}>
          Tags
        </Heading>
        <Box
          border="1px"
          padding={4}
          borderColor="gray.200"
          mb={6}
          boxShadow="lg"
          rounded="md"
          minW="200px"
          maxW="200px"
          color="gray.500"
        >
          <UnorderedList>
            {allTags.map((tag: any) => (
              <Link to={`/tag/${tag.id}`} key={tag.id}>
                <ListItem>{tag.tag_name}</ListItem>
              </Link>
            ))}
          </UnorderedList>
        </Box>
      </MotionBox>
    </HStack>
  );
};

export default Explore;
