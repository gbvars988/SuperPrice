import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LABEL, PATH } from "../../language";

const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formHasError, setFormHasError] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const allFieldsFilled =
    firstName && lastName && email && password && confirmPassword;

  const userServiceUrl = process.env.REACT_APP_USER_SERVICE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(LABEL.PASSWORDS_DONT_MATCH);
      setFormHasError(true);
      return;
    }

    try {
      const response = await axios.post(`${userServiceUrl}/user/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data) {
        const { userID, email, firstName, lastName } = response.data;
        setUser({ userID, email, firstName, lastName });
        navigate(PATH.SHOP);
      }
    } catch (err) {
      // @ts-ignore
      setError(err.response?.data?.message || LABEL.REGISTER_ERROR);
      setFormHasError(true);
    }
  };

  return (
    <Box borderWidth={1} borderRadius="md" p={10} minWidth={"450px"}>
      <Heading size="lg" mb={2}>
        {LABEL.WELCOME}
      </Heading>
      <Text fontSize={"xl"} color={"gray.400"} mb={5}>
        {LABEL.SIGN_UP_WITH_EMAIL}
      </Text>
      <FormControl onSubmit={handleSubmit} isInvalid={formHasError}>
        <Box h="100px">
          <FormLabel>{LABEL.FIRST_NAME}</FormLabel>
          <Input
            type="text"
            placeholder={LABEL.ENTER_YOUR_FIRST_NAME}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box h="100px">
          <FormLabel>{LABEL.LAST_NAME}</FormLabel>
          <Input
            type="text"
            placeholder={LABEL.ENTER_YOUR_LAST_NAME}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box h="100px">
          <FormLabel>{LABEL.EMAIL}</FormLabel>
          <Input
            type="email"
            placeholder={LABEL.ENTER_YOUR_EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box h="100px">
          <FormLabel>{LABEL.PASSWORD}</FormLabel>
          <Input
            type="password"
            placeholder={LABEL.ENTER_YOUR_PASSWORD}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box h="100px">
          <FormLabel>{LABEL.CONFIRM_PASSWORD}</FormLabel>
          <Input
            type="password"
            placeholder={LABEL.CONFIRM_YOUR_PASSWORD}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        {error && <FormErrorMessage mb={5}>{error}</FormErrorMessage>}
        <Box display="flex" justifyContent="center">
          <Button
            colorScheme="teal"
            type="submit"
            onClick={handleSubmit}
            isDisabled={!allFieldsFilled}
          >
            {LABEL.SIGN_UP}
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SignUpForm;
