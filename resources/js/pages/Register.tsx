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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
};

const axios = require("axios");

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword }: RegisterProps = userData;

  const handleSumbit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const image: Array<string> = name.split(" ");
    let alias: string = "";
    image.length > 1
      ? (alias = image[0].charAt(0) + image[1].charAt(0))
      : (alias = image[0].charAt(0));

    const res = await axios.post("/api/register", {
      name,
      email,
      password,
      photo_profile: `https://avatars.dicebear.com/api/initials/:${alias}.svg`,
    });
    navigate("/login");
  };

  const handleChangeInput = (e: React.FormEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <VStack spacing={3} alignItems="center" w="full">
      <VStack align="center">
        <Heading size="xl">Register to ANS</Heading>
        <Text>
          If you already have an account, click here to&nbsp;
          <Link to="/login">
            <Text as="span" color="#5865F2">
              Login
            </Text>
          </Link>
        </Text>
      </VStack>
      <Box as="form" onSubmit={handleSumbit}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="sm">
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
            <Button size="lg" w="full" type="submit" colorScheme="brand">
              Register
            </Button>
          </GridItem>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Register;
