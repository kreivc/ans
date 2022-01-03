import React, { useState } from "react";
import {
  Flex,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Box,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  VStack,
  Spinner,
  createStandaloneToast,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/UserSlice";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;
  const [isLoading, setIsLoading] = useState(false);
  const toast = createStandaloneToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef() as any;

  const searchSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (search === "") {
      return;
    }
    const res = await axios.post("/api/question/search?keyword=" + search);
    setIsLoading(false);
    navigate("/search/result", {
      state: { result: res.data, keyword: search },
    });
  };

  const handleLogout = async () => {
    dispatch(logout());
    toast({
      title: "Logged Out Success!",
      description: "Successfully logout.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };
  return (
    <>
      <Box py="2" borderBottomWidth={2} borderBottomColor={"gray.200"}>
        <Flex
          h="full"
          px={{ base: "2", md: "24" }}
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
            <Flex color="#605C5C" gridGap={1} d={{ base: "none", md: "flex" }}>
              <Button variant="ghost" onClick={() => navigate("/explore")}>
                Explore
              </Button>
              <Button variant="ghost">About Us</Button>
              <Button variant="ghost" onClick={() => navigate("/ask")}>
                Ask
              </Button>
            </Flex>
          </Flex>
          <Flex
            justify="flex-end"
            align="center"
            color="gray.400"
            gridGap="4"
            d={{ base: "none", md: "flex" }}
          >
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
                children={
                  isLoading ? (
                    <Spinner colorScheme="brand" />
                  ) : (
                    <AiOutlineSearch />
                  )
                }
                type="submit"
              />
            </InputGroup>
            {isLogged ? (
              <Button
                colorScheme="brand"
                cursor="pointer"
                leftIcon={<FiLogOut />}
                onClick={handleLogout}
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
          <Flex
            d={{ base: "flex", md: "none" }}
            justify="flex-end"
            align="center"
            color="gray.400"
          >
            <IconButton
              ref={btnRef}
              variant="ghost"
              onClick={onOpen}
              colorScheme="brand"
              aria-label="Open Drawer"
              icon={<GoThreeBars />}
              fontSize="xl"
            />
          </Flex>
        </Flex>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="Background.500">ANS</DrawerHeader>

          <DrawerBody>
            <VStack>
              <Button
                w="300px"
                variant="ghost"
                onClick={() => navigate("/explore")}
              >
                Explore
              </Button>
              <Button w="300px" variant="ghost">
                About Us
              </Button>
              <Button
                w="300px"
                variant="ghost"
                onClick={() => navigate("/ask")}
              >
                Ask
              </Button>
            </VStack>
          </DrawerBody>

          <VStack mb="6">
            {isLogged ? (
              <Button
                colorScheme="brand"
                cursor="pointer"
                leftIcon={<FiLogOut />}
                onClick={() => dispatch(logout())}
                w="300px"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  colorScheme="brand"
                  cursor="pointer"
                  leftIcon={<RiShieldUserFill />}
                  w="300px"
                >
                  Login
                </Button>
              </Link>
            )}
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
                children={
                  isLoading ? (
                    <Spinner colorScheme="brand" />
                  ) : (
                    <AiOutlineSearch />
                  )
                }
                type="submit"
              />
            </InputGroup>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
