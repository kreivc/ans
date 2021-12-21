import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSlice";
import { BiEdit, BiTrash } from "react-icons/bi";

type User = {
  created_at: Date;
  email: string;
  email_verified_at?: string;
  id: number;
  name: string;
  photo_profile: string;
  updated_at: Date;
};

export type QuestionCardProps = {
  body: string;
  created_at: Date;
  id: number;
  image_url: string;
  question_tag: string[];
  length: number;
  title: string;
  updated_at: Date;
  user: User;
  user_id: number;
};

export default function QuestionCard(props: QuestionCardProps) {
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;
  return (
    <Box
      border="1px"
      padding={4}
      borderColor="gray.200"
      mb={6}
      boxShadow="lg"
      rounded="md"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Image
            borderRadius="full"
            boxSize="30px"
            src={props.user.photo_profile}
            alt={props.user.name}
          />
          <Flex direction="column" px={4}>
            <Text fontSize="lg" color="GrayText">
              {props.user.name}
            </Text>
            <Text fontSize="xs" color="GrayText">
              {new Date(props.created_at).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
        </Flex>
        {isLogged && user.user.id === props.user_id && (
          <HStack spacing={2}>
            <IconButton aria-label="Delete Question" icon={<BiTrash />} />
            <IconButton aria-label="Edit Question" icon={<BiEdit />} />
          </HStack>
        )}
      </Flex>
      <Flex direction="column" px={10} py={2}>
        <Heading fontSize="3xl" color="black">
          {props.title}
        </Heading>
        <Text fontSize="md" color="GrayText" py={1} isTruncated maxW="2xl">
          {props.body}
        </Text>
        <Flex justifyItems="center" my={2}>
          {props.question_tag
            ? props.question_tag.map((question_tag: any, id: any) => (
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
