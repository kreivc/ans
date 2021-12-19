import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/UserSlice";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    const res = await axios.post("/api/question/search?keyword=" + search);
    navigate("/search/result", {
      state: { result: res.data, keyword: search },
    });
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;

  const exploreSsr = async () => {
    const res = await axios.get("/api/question/explore");
    navigate("/explore", {
      state: { result: res.data },
    });
  };

  return (
    <Box py="2" borderBottomWidth={2} borderBottomColor={"gray.200"}>
      <Flex
        h="full"
        px="24"
        alignItems="center"
        justifyContent="space-between"
        maxW="container.xl"
        mx="auto"
      >
        <Flex align="flex-start" alignItems="center" gridGap="3">
          <Link to="/">
            <Heading mr="5" cursor="pointer" color="#5865F2">
              ANS
            </Heading>
          </Link>
          <Flex color="#605C5C" gridGap={1}>
            <Button variant="ghost" onClick={exploreSsr}>
              Explore
            </Button>
            <Button variant="ghost">About Us</Button>
            <Button variant="ghost" onClick={() => navigate("/ask")}>
              Ask
            </Button>
          </Flex>
        </Flex>
        <Flex justify="flex-end" align="center" color="gray.400" gridGap="4">
          <InputGroup w="300px" as="form" onSubmit={searchSubmit}>
            <Input
              type="text"
              placeholder="Any Question?"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
              rounded="md"
            />
            <InputRightElement
              as="button"
              children={<AiOutlineSearch color="#5865F2" />}
              type="submit"
            />
          </InputGroup>
          {isLogged ? (
            <Button
              colorScheme="brand"
              cursor="pointer"
              leftIcon={<FiLogOut />}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                colorScheme="brand"
                cursor="pointer"
                leftIcon={<RiShieldUserFill />}
              >
                Login
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
