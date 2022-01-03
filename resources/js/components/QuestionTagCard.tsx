import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { QuestionListProps } from "../pages/Tag";

export default function QuestionTagCard(props: QuestionListProps) {
  return (
    <Box
      border="1px"
      padding={4}
      borderColor="gray.200"
      boxShadow="lg"
      rounded="md"
    >
      <Heading mb={2}>{props.question.title}</Heading>
      <Text noOfLines={4}>{props.question.body.replace(/<[^>]*>?/gm, "")}</Text>
    </Box>
  );
}
