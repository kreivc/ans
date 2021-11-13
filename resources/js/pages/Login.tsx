import {
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <VStack spacing={3} alignItems="center" w="full">
      <VStack align="center">
        <Heading size="xl">Login to ANS</Heading>
        <Text>
          If you don’t have an account, click here to&nbsp;
          <Link to="/register">
            <Text as="span" color="#5865F2">
              Register
            </Text>
          </Link>
        </Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="sm">
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" type="email" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type="password" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Checkbox>Keep me logged in</Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Button size="lg" w="full" type="submit" colorScheme="brand">
            Login
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Login;
