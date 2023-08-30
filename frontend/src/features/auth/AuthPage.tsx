import React, {useState} from 'react';
import {Button, Container, VStack} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

enum AuthFormType {
    LOGIN,
    SIGNUP
}

const AuthPage: React.FC = () => {
    const [currentForm, setCurrentForm] = useState<AuthFormType>(AuthFormType.LOGIN);

    const toggleForm = () => {
        setCurrentForm(currentForm === AuthFormType.LOGIN ? AuthFormType.SIGNUP : AuthFormType.LOGIN);
    };

    return (
        <Container maxW="3xl" pt={20}>
            <VStack spacing={8} align={"center"}>
                {currentForm === AuthFormType.LOGIN ? <LoginForm/> : <SignUpForm/>}
                <Button colorScheme="teal" onClick={toggleForm} variant={"ghost"}>
                    Switch to {currentForm === AuthFormType.LOGIN ? 'Sign Up' : 'Login'}
                </Button>
            </VStack>
        </Container>
    );
};

export default AuthPage;
