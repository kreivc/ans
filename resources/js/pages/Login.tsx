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
  Checkbox,
  createStandaloneToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { login, LoginProps } from "../store/UserSlice";
import { validateLogin } from "../utils";
import theme from "../utils/theme";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const { email, password }: LoginProps = userData;
  const toast = createStandaloneToast({ theme: theme });
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setIsLoading(true);
    const validateData = validateLogin(userData.email, userData.password);

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

    const { payload } = await dispatch(login({ email, password }));
    if (payload === undefined) {
      toast({
        title: "Credential Error!",
        description: "Unable to login.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    } else {
      toast({
        title: "Login Success!",
        description: "Successfully logged.",
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
        <Heading size="xl">Login to ANS</Heading>
        <Text textAlign="center" px="10">
          If you don’t have an account, click here to&nbsp;
          <Link to="/register">
            <Text as="span" color="#5865F2">
              Register
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
            <Checkbox
              defaultChecked={false}
              onBlur={undefined}
              checked={undefined}
            >
              Keep me logged in
            </Checkbox>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              size="lg"
              w="full"
              type="submit"
              colorScheme="brand"
              isLoading={isLoading}
            >
              Login
            </Button>
          </GridItem>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Login;
