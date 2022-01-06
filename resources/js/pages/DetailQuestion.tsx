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
  Button,
  Textarea,
  UnorderedList,
  useDisclosure,
  VStack,
  createStandaloneToast,
} from "@chakra-ui/react";
import axios from "axios";
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
import theme from "../utils/theme";

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
  const { id } = useParams();
  const [loding, setLoding] = useState(false);
  const [question, setQuestion] = useState<QuestionDetailProps | null>(null);
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState<string>("");
  const toast = createStandaloneToast({ theme: theme });
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    if (!isLogged) {
      toast({
        title: "Not Authorized!",
        description: "Login to continue.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
      setLoading(false);
      return;
    }
    const res = await axios.post(
      "/api/answer/create",
      {
        question_id: question!.id,
        body: body,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    toast({
      title: "Success Answer the Question!",
      description: "We reload page for you",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate(0);
  };

  return (
    <>
      <Modal
        id={question?.id || 0}
        isOpen={isOpen}
        onClose={onClose}
        title={question?.title || ""}
        from="DetailQuestion"
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
        maxW="container.xl"
        mx="auto"
        px={{ base: 0, md: "20" }}
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
            <Box flexGrow={6} mr={{ base: 0, md: "80px" }}>
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
                        date: question ? question.created_at : "",
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
                  <VStack alignItems="flex-end" mx="4">
                    <Flex w="full" gridGap={2}>
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
                        py="2"
                        placeholder="Answer the question"
                        colorScheme="brand"
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </Flex>
                    <Button
                      types="submit"
                      colorScheme="brand"
                      justifySelf="flex-end"
                      onClick={handleSubmit}
                      isLoading={loading}
                    >
                      Answer
                    </Button>
                  </VStack>
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
            </Box>

            {question && Object.keys(question.question_tag).length !== 0 && (
              <Box
                flexGrow={2}
                // initial={{ opacity: 0, x: 100 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.7 }}
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
              </Box>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
