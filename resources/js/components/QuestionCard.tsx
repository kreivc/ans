import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSlice";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export type UserProps = {
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
  user: UserProps;
  user_id: number;
};

export default function QuestionCard(props: QuestionCardProps) {
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/ask", {
      state: {
        update: {
          id: props.id,
          title: props.title,
          body: props.body,
          image_url: props.image_url,
          question_tag: props.question_tag,
        },
      },
    });
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <>
      <Modal
        id={props.id}
        isOpen={isOpen}
        onClose={onClose}
        title={props.title}
        from="Explore"
      />
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
              <IconButton
                onClick={handleDelete}
                aria-label="Delete Question"
                icon={<BiTrash />}
              />
              <IconButton
                onClick={handleUpdate}
                aria-label="Edit Question"
                icon={<BiEdit />}
              />
            </HStack>
          )}
        </Flex>
        <Flex direction="column" px={10} py={2}>
          <Heading fontSize="3xl" color="black">
            {props.title}
          </Heading>
          <Text fontSize="md" color="GrayText" py={1} isTruncated maxW="2xl">
            {props.body.replace(/<[^>]*>?/gm, "")}
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
    </>
  );
}
