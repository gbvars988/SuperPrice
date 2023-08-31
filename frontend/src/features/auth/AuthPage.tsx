import React, {useState} from 'react';
import {Button, VStack} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import {LABEL} from "../../language";
import PageContainer from "../../components/common/PageContainer";

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
        <PageContainer>
            <VStack spacing={8} align={"center"}>
                {currentForm === AuthFormType.LOGIN ? <LoginForm/> : <SignUpForm/>}
                <Button colorScheme="teal" onClick={toggleForm} variant={"ghost"}>
                    Switch to {currentForm === AuthFormType.LOGIN ? LABEL.SIGN_UP : LABEL.LOGIN}
                </Button>
            </VStack>
        </PageContainer>
    );
};

export default AuthPage;
