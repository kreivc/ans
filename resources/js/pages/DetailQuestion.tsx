import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  ListItem,
  Spinner,
  Text,
  Textarea,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import parse from "html-react-parser";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSlice";
import { UserProps } from "../components/QuestionCard";
import { TagsProps } from "./Ask";
import Modal from "../components/Modal";
import { BiEdit, BiTrash } from "react-icons/bi";

export interface Answer {
  id: number;
  question_id: number;
  user_id: number;
  body: string;
  created_at: Date;
  updated_ad: Date;
}

type QuestionDetailProps = {
  answer: Answer[];
  body: string;
  created_at: Date;
  id: number;
  image_url: string;
  question_tag: TagsProps[];
  title: string;
  updated_at: Date;
  user: UserProps;
  user_id: number;
};

export default function DetailQuestion() {
  const MotionBox = motion(Box);
  const { id } = useParams();
  const [loding, setLoding] = useState(false);
  const [question, setQuestion] = useState<QuestionDetailProps | null>(null);
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/ask", {
      state: {
        update: {
          id: question?.id,
          title: question?.title,
          body: question?.body,
          image_url: question?.image_url,
          question_tag: question?.question_tag,
        },
      },
    });
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpen();
  };

  useEffect(() => {
    const getQuestion = async () => {
      setLoding(true);
      const res = await axios.get("/api/question/" + id);
      setQuestion(res.data.question);
      setLoding(false);
    };
    getQuestion();
  }, []);

  return (
    <>
      <Modal
        id={question?.id || 0}
        isOpen={isOpen}
        onClose={onClose}
        title={question?.title || ""}
        from="DetailQuestion"
      />
      <HStack
        justifyContent="space-between"
        w="full"
        maxW="container.xl"
        mx="auto"
        px="20"
        alignItems="flex-start"
      >
        {loding === true ? (
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
              flexGrow={6}
              mr="80px"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Box
                w="full"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                shadow="2xl"
              >
                {question && question.image_url && (
                  <Image
                    objectFit="cover"
                    h="250px"
                    w="inherit"
                    src={question.image_url}
                    alt="image"
                  />
                )}
                <Box p="6">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    py="2"
                  >
                    <AvatarCard
                      data={{
                        image: question ? question.user.photo_profile : "",
                        name: question ? question.user.name : "",
                        date: 0,
                      }}
                    />
                    {isLogged && user.user.id === question?.user_id && (
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
                  <Heading size="xl">{question && question.title}</Heading>
                  <Box fontSize="md" my="6">
                    {parse(question ? question.body : "")}
                  </Box>
                </Box>
                <Divider />
                <Box p="6">
                  <Heading size="md" mb={4}>
                    Answers:
                  </Heading>
                  <Flex>
                    <Image
                      borderRadius="full"
                      boxSize="30px"
                      src={
                        isLogged
                          ? user.user.photo_profile
                          : "https://res.cloudinary.com/dor0udr7t/image/upload/v1629998645/nextjsEcommerce/es6ofxvauhe7lghwgh7g.png"
                      }
                      alt="image"
                    />
                    <Textarea
                      mx="4"
                      py="2"
                      placeholder="Here is a sample placeholder"
                      colorScheme="brand"
                    />
                  </Flex>
                </Box>
                {question &&
                  question.answer.map((result: any, id: any) => (
                    <Box p="3" key={id}>
                      <Flex alignItems="center">
                        <Box
                          borderWidth="2px"
                          borderRadius="lg"
                          width="full"
                          mx="4"
                          py="2"
                        >
                          <Box px={4}>
                            <AvatarCard
                              data={{
                                image: result ? result.user.photo_profile : "",
                                name: result ? result.user.name : "",
                                date: result ? result.created_at : "",
                              }}
                            />
                          </Box>
                          <Box fontSize="lg" px={4} my="2">
                            {result ? result.body : ""}
                          </Box>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
              </Box>
            </MotionBox>

            {question && Object.keys(question.question_tag).length !== 0 && (
              <MotionBox
                flexGrow={2}
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
                    {question.question_tag.map((data: any) => (
                      <Link to={`/tag/${data.tag.id}`} key={data.tag.id}>
                        <ListItem>{data.tag.tag_name}</ListItem>
                      </Link>
                    ))}
                  </UnorderedList>
                </Box>
              </MotionBox>
            )}
          </>
        )}
      </HStack>
    </>
  );
}
