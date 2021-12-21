import {
    Badge,
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    ListItem,
    Spinner,
    Tag,
    Text,
    Textarea,
    UnorderedList,
  } from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import { useAppDispatch } from "../store/hooks";
import parse from "html-react-parser";

export interface Answer{
    id: number;
    question_id: number;
    user_id: number;
    body: string;
    created_at: Date;
    updated_ad: Date;
}

export default function DetailQuestion() {
    const MotionBox = motion(Box);
    const { id } = useParams();
    // const [answer, setAnswer] = useState<Answer[]>();
    const [loding, setLoding] = useState(false);
    const [question, setQuestion] = useState<any[any]>();
    useEffect(() => {
        const getQuestion = async()=>{
            setLoding(true);
            const res = await axios.get('/api/question/'+id);
            console.log(res.data.question);
            setQuestion(res.data.question);
            setLoding(false);
        }
        getQuestion()
    },[]);
    return (
            <HStack
                justifyContent="space-between"
                w="full"
                maxW="container.xl"
                mx="auto"
                px="20"
                alignItems="flex-start"
            >
            {
                loding === true?
                <Box>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Box>
                :
                <><MotionBox
                        flexGrow={6}
                        mr="80px"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Box w='full' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow="2xl">
                            <Image objectFit='fill' h='250px' w='inherit' src={question ? question.image_url : ""}
                                alt="image" />
                            <Box p='6'>
                                <Box display='flex' alignItems='baseline' py='2'>
                                    <AvatarCard data={{
                                        image: question ? question.user.photo_profile : "",
                                        name: question ? question.user.name : "",
                                        date: 0
                                    }} />
                                </Box>
                                <Heading size='xl'>
                                    {question ? question.title : null}
                                </Heading>
                                <Text fontSize='md' my='6'>
                                    {parse(question ? question.body : "")}
                                </Text>
                            </Box>
                            <hr />
                            <Box p='6'>
                                <Flex>
                                    <Image
                                        borderRadius="full"
                                        boxSize="30px"
                                        src="https://avatars.dicebear.com/api/initials/:R.svg"
                                        alt="image" />
                                    <Textarea mx='4' py='2' placeholder='Here is a sample placeholder' />
                                </Flex>
                            </Box>
                            {question ? question.answer.map((result: any, id: any) => (
                                <Box p='3' key={id}>
                                    <Flex alignItems="center">
                                        <Box borderWidth='2px' borderRadius='lg' width='full' mx='4' py='2'>
                                            <Box px={4}>
                                                <AvatarCard data={{
                                                    image: result ? result.user.photo_profile : "",
                                                    name: result ? result.user.name : "",
                                                    date: result ? result.created_at : ""
                                                }} />
                                            </Box>
                                            <Text fontSize='lg' px={4} my='2'>
                                                {result ? result.body : ""}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            )) : null}
                        </Box>
                    </MotionBox><MotionBox
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
                                    {question ? question.question_tag.map((data: any, id: any) => (
                                        <ListItem key={id}>{data ? data.tag.tag_name : ""}</ListItem>
                                    )) : null}
                                </UnorderedList>
                            </Box>
                        </MotionBox></>
                }
        </HStack>

    );
  }
