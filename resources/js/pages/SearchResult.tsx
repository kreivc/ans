import React from "react";
import { Box, Flex, Grid, Heading, Image, Tag, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function SearchResult(props: any) {
    const location= useLocation();
    console.log(location.state);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <Flex direction='column' w="100%" alignItems='center'>
        <Heading fontSize='3xl' color='black' py={2}>Search results for {location.state.keyword}</Heading>
        {
            location.state.result.question?
            location.state.result.question.map((data: any,id: any)=>
                <Box key={id} w="60%" border='1px' padding={4} borderColor='gray.200' mb={6} boxShadow='lg' rounded='md'>
                    <Flex alignItems='center'>
                        <Image
                            borderRadius='full'
                            boxSize='30px'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                            />
                        <Flex direction='column' px={4}>
                            <Text fontSize='lg' color='GrayText'>{data.user.name}</Text>
                            <Text fontSize='xs' color='GrayText'>{data.created_at?months[new Date(data.created_at).getMonth()]+" "+new Date(data.created_at).getFullYear():""}</Text>
                        </Flex>
                    </Flex>
                    <Flex direction='column' px={10} py={2}>
                        <Heading fontSize='3xl' color='black'>{data.title}</Heading>
                        <Text fontSize='md' color='GrayText' py={1}  isTruncated>{data.body}</Text>
                        <Flex justifyItems='center' my={2}>
                            {
                                data.question_tag?
                                data.question_tag.map((question_tag:any,id:any)=>
                                    <Tag fontSize='sm' key={id} cursor='pointer' color='GrayText' py={1} px={2} mr={2}># {question_tag.tag.tag_name}</Tag>
                                )
                                :""
                            }
                        </Flex>
                    </Flex>
                </Box>
            )
            :""
        }
    </Flex>
  );
}
