import {
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Input,
  Button,
  Box,
  createStandaloneToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { register } from "../store/UserSlice";
import { validateRegister } from "../utils";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const axios = require("axios");

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword }: RegisterProps = userData;
  const toast = createStandaloneToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setIsLoading(true);

    const validateData = validateRegister(
      userData.name,
      userData.email,
      userData.password
    );

    if (validateData.status === "error") {
      toast({
        title: validateData.title,
        description: validateData.description,
        status: validateData.status,
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const image: Array<string> = name.split(" ");
    let alias: string = "";
    image.length > 1
      ? (alias = image[0].charAt(0) + image[1].charAt(0))
      : (alias = image[0].charAt(0));

    const { payload } = await dispatch(
      register({
        name,
        email,
        password,
        photo_profile: `https://avatars.dicebear.com/api/initials/:${alias}.svg`,
      })
    );

    if (payload === undefined) {
      toast({
        title: "Something went Wrong!",
        description: "Pls Try again..",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: "Register Success!",
        description: "Successfully Registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    navigate("/");
  };

  const handleChangeInput = (e: React.FormEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <VStack spacing={3} alignItems="center" w="full">
      <VStack align="center">
        <Heading size="xl">Register to ANS</Heading>
        <Text textAlign="center" px="10">
          If you already have an account, click here to&nbsp;
          <Link to="/login">
            <Text as="span" color="#5865F2">
              Login
            </Text>
          </Link>
        </Text>
      </VStack>
      <Box as="form" onSubmit={handleSumbit}>
        <SimpleGrid
          columns={2}
          columnGap={3}
          rowGap={6}
          w={{ base: "auto", md: "sm" }}
        >
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleChangeInput}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChangeInput}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChangeInput}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={handleChangeInput}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              size="lg"
              w="full"
              type="submit"
              colorScheme="brand"
              isLoading={isLoading}
            >
              Register
            </Button>
          </GridItem>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Register;
