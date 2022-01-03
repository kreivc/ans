import {
  Box,
  Flex,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuestionCard, { QuestionCardProps } from "../components/QuestionCard";

type TagsProps = {
  id: number;
  tag_name: string;
  created_at?: Date;
  updated_at?: Date;
};

const Explore = () => {
  const [allQuestion, setAllQuestion] = useState<QuestionCardProps[]>();
  const [allTags, setAllTags] = useState<TagsProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const MotionBox = motion(Box);

  useEffect(() => {
    const explore = async () => {
      const { data } = await axios.get("/api/question/explore");
      setAllQuestion(data.questions);
      setAllTags(data.tags);
      setIsLoading(false);
    };
    explore();
  }, []);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      w="full"
      maxW="container.xl"
      mx="auto"
      px={{ base: "0", md: "20" }}
      alignItems="flex-start"
    >
      {isLoading ? (
        <Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
          />
        </Box>
      ) : (
        <>
          <MotionBox
            flexGrow={4}
            mr="9"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            maxW={{ base: "full", md: "container.xl" }}
          >
            <Heading fontSize="3xl" color="black" py={2}>
              Explore
            </Heading>
            {allQuestion ? (
              allQuestion.map((data, id) => (
                <Link to={`/question/${data.id}`} key={id}>
                  <QuestionCard {...data} />
                </Link>
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
                {allTags?.map((tag) => (
                  <Link to={`/tag/${tag.id}`} key={tag.id}>
                    <ListItem>{tag.tag_name}</ListItem>
                  </Link>
                ))}
              </UnorderedList>
            </Box>
          </MotionBox>
        </>
      )}
    </Flex>
  );
};

export default Explore;
