"use client";
import { useRouter } from "next/router";
import { SET_USER } from "@/redux/reducers/userSlice";
import { signIn } from "@/services/auth";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";

import { ChangeEvent, Fragment, useState } from "react";
import { useDispatch } from "react-redux";

export default function SplitScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signInCredentials, setSignInCredentials] = useState({
    email: "",
    password: "",
  });

  const [signInError, setSignInError] = useState(false);

  const handleTextFieldUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignInCredentials({ ...signInCredentials, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      let res = await signIn({
        email: signInCredentials.email,
        password: signInCredentials.password,
      });
      dispatch(SET_USER({ ...res.data }));
      setSignInError(false);
      console.log(res.data);
      if (res.data.role === "superadmin") {
        router.push("/superadmin/home");
      } else if (res.data.role === "client") {
        router.push("/client/home");
      }
    } catch (error) {
      console.log("error = ", error);
      setSignInError(true);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1} display={{ base: "none", md: "block" }}>
        <Image
          alt={"Login Image"}
          width="100%"
          height="100vh"
          src={"/images/signin/signin-image.png"}
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"} pos="relative">
          <Image
            alt={"Login Image"}
            width="30%"
            src={"/images/logo-dark.svg"}
            pos="absolute"
            top="-12rem"
          />
          {signInError ? (
            <Fragment>
              <Box
                as="p"
                bgColor="red.100"
                w="100%"
                p="1rem"
                border="1px solid red"
                borderRadius=".5rem"
                color="red.600"
                textAlign="center"
              >
                There was an error signing in to your account.
              </Box>
            </Fragment>
          ) : null}
          <Heading fontSize={"28px"}>Welcome back</Heading>
          <Text color="#7E8381" fontSize="14px" marginTop="-1rem">
            Please enter your credentials below.
          </Text>
          <FormControl id="email" mb="1rem">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={signInCredentials.email}
              name="email"
              onChange={handleTextFieldUpdate}
            />
          </FormControl>
          <FormControl id="password" mb="1rem">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={signInCredentials.password}
              onChange={handleTextFieldUpdate}
            />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              {/* <Checkbox>Remember me</Checkbox> */}
              <Text color="#00A067">Forgot password?</Text>
            </Stack>
            <Button
              bgColor="#00A067"
              color="white"
              variant={"solid"}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
            {/* <Text>
              Don't have an account?{" "}
              <Box as="span" color="#00A067">
                Create Account
              </Box>
            </Text> */}
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
