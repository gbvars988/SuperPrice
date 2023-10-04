import React, {useContext, useState} from 'react';
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text} from '@chakra-ui/react';
import {UserContext} from '../../context/UserContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {LABEL, PATH} from '../../language';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [formHasError, setFormHasError] = useState(false);

    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const allFieldsFilled = email && password;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/user-service/user/authenticate', {
                email,
                password
            });

            if (response.data) {
                const {userID, email, firstName, lastName} = response.data;
                setUser({userID, email, firstName, lastName});
                navigate(PATH.SHOP);
            }
        } catch (err) {
            // @ts-ignore
            setError(err.response?.data?.message || LABEL.LOGIN_ERROR);
            setFormHasError(true);
        }
    };

    return (
        <Box borderWidth={1} borderRadius="md" p={10} minWidth={"450px"}>
            <Heading size="lg" mb={2}>
                {LABEL.WELCOME_BACK}
            </Heading>
            <Text fontSize={"xl"} color={"gray.400"} mb={5}>
                {LABEL.LOGIN_WITH_EMAIL}
            </Text>
            <FormControl onSubmit={handleSubmit} isInvalid={formHasError}>
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
                {error && <FormErrorMessage mb={5}>{error}</FormErrorMessage>}
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <Button
                        colorScheme="teal"
                        type="submit"
                        onClick={handleSubmit}
                        isDisabled={!allFieldsFilled}
                    >
                        {LABEL.LOGIN}
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default LoginForm;
