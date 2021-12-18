import { Box, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react";
import React from "react";

type UserPros = {
  created_at: Date;
  email: string;
  email_verified_at?: string;
  id: number;
  name: string;
  photo_profile: string;
  updated_at: Date;
};

type QuestionCardProps = {
  body: string;
  created_at: Date;
  id: number;
  image_url: string;
  question_tag: string[];
  length: number;
  title: string;
  updated_at: Date;
  user: UserPros;
  user_id: number;
};

export default function QuestionCard({ data }: { data: QuestionCardProps }) {
  return (
    <Box
      border="1px"
      padding={4}
      borderColor="gray.200"
      mb={6}
      boxShadow="lg"
      rounded="md"
    >
      <Flex alignItems="center">
        <Image
          borderRadius="full"
          boxSize="30px"
          src={data.user.photo_profile}
          alt={data.user.name}
        />
        <Flex direction="column" px={4}>
          <Text fontSize="lg" color="GrayText">
            {data.user.name}
          </Text>
          <Text fontSize="xs" color="GrayText">
            {new Date(data.created_at).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" px={10} py={2}>
        <Heading fontSize="3xl" color="black">
          {data.title}
        </Heading>
        <Text fontSize="md" color="GrayText" py={1} isTruncated maxW="2xl">
          {data.body}
        </Text>
        <Flex justifyItems="center" my={2}>
          {data.question_tag
            ? data.question_tag.map((question_tag: any, id: any) => (
                <Tag
                  fontSize="sm"
                  key={id}
                  cursor="pointer"
                  color="GrayText"
                  py={1}
                  px={2}
                  mr={2}
                >
                  # {question_tag.tag.tag_name}
                </Tag>
              ))
            : ""}
        </Flex>
      </Flex>
    </Box>
  );
}
