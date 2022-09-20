import React, { useContext, useState } from "react";
import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setInvLogin, invalidLogin } = useContext(DataContext);

  const [details, setDetails] = useState({ username: "", password: "" });
  const [invalidUser, setInvUser] = useState(false);
  const [invalidPass, setInvPass] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setInvLogin(false);
    if (details.username === "" || details.password === "") {
      details.username === "" ? setInvUser(true) : setInvPass(true);
    }

    setUser({ Username: details.username, Password: details.password });
  };

  const createaccount = () => {
    navigate("/signup");
  };

  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify="center"
      h="100vh"
    >
      <Heading>Login To Access The Map</Heading>

      <FormControl isInvalid={invalidUser}>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          placeholder="Enter Username"
          autoComplete="off"
          size="lg"
          onChange={(e) => {
            setInvUser(false);
            setDetails({ ...details, username: e.target.value });
          }}
          value={details.username}
        />
        <FormErrorMessage>Enter a Username</FormErrorMessage>
      </FormControl>

      <FormControl pt=".5rem" isInvalid={invalidPass}>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          placeholder="Enter Password"
          autoComplete="off"
          type="password"
          size="lg"
          onChange={(e) => {
            setInvPass(false);
            setDetails({ ...details, password: e.target.value });
          }}
          value={details.password}
        />
        <FormErrorMessage>Enter a Password</FormErrorMessage>
      </FormControl>

      <ButtonGroup pt="1rem">
        <Button colorScheme="blue" type="submit" onClick={submit}>
          Log In
        </Button>
        <Button onClick={createaccount}>Create Account</Button>
      </ButtonGroup>
      {invalidLogin ? (
        <Alert status="error">
          <AlertIcon />
          Incorect Username or Password
        </Alert>
      ) : (
        <></>
      )}
    </VStack>
  );
};
