import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard, { QuestionCardProps } from "../components/QuestionCard";
import { motion } from "framer-motion";
import axios from "axios";
import QuestionTagCard from "../components/QuestionTagCard";

export type QuestionListProps = {
  question_id: number;
  tag_id: number;
  created_at: Date;
  updated_at: Date;
  question: {
    id: number;
    user_id: number;
    title: string;
    image_url: string;
    body: string;
    created_at: Date;
    updated_at: Date;
  };
};

export default function Tag() {
  const MotionBox = motion(Box);
  const location = useLocation();
  const [questionList, setQuestionList] = useState<QuestionListProps[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/api/findByTag/${location.pathname.split("/")[2]}`
      );
      setQuestionList(data[0].question_tag);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
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
        <Flex direction="column" w="100%" alignItems="center">
          <Heading fontSize="3xl" color="black" py={2} mb={4}>
            By Tag found {questionList ? questionList?.length : "0"} Questions
          </Heading>

          <MotionBox
            w="100%"
            maxW="container.lg"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
              {questionList ? (
                questionList.map((data: QuestionListProps, id: number) => (
                  <Box key={id} flexGrow={1}>
                    <Link to={`/question/${data.question_id}`}>
                      <QuestionTagCard {...data} />
                    </Link>
                  </Box>
                ))
              ) : (
                <Text>No result found</Text>
              )}
            </SimpleGrid>
          </MotionBox>
        </Flex>
      )}
    </>
  );
}
