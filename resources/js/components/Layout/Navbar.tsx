import React from "react";
import {
  Flex,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Box,
  Heading,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <Box w="full" py="2" borderBottomWidth={2} borderBottomColor={"gray.200"}>
      <Flex h="full" px="24" alignItems="center" justifyContent="space-between">
        <Flex align="flex-start" alignItems="center" gridGap="3">
          <Link to="/">
            <Heading mr="5" cursor="pointer" color="#5865F2">
              ANS
            </Heading>
          </Link>
          <Flex color="#605C5C" gridGap={1}>
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Explore</Button>
            <Button variant="ghost">Top Users</Button>
            <Button variant="ghost">About Us</Button>
          </Flex>
        </Flex>

        <Flex justify="flex-end" align="center" color="gray.400" gridGap="4">
          <InputGroup w="300px" as="form">
            <Input type="text" placeholder="Any Question?" rounded="md" />
            <InputRightElement
              as="button"
              children={<AiOutlineSearch color="#5865F2" />}
              type="submit"
            />
          </InputGroup>
          <Link to="/login">
            <Button
              colorScheme="brand"
              cursor="pointer"
              leftIcon={<RiShieldUserFill />}
            >
              Login
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}