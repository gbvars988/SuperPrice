import React from 'react';
import {Box, Button, FormControl, FormLabel, Heading, Input, Text} from '@chakra-ui/react';
import {LABEL} from "../../language";

const LoginForm: React.FC = () => {
    return (
        <Box borderWidth={1} borderRadius="md" p={5} minWidth={"350px"}>
            <Heading size="md" mb={2}>
                {LABEL.WELCOME_BACK}
            </Heading>
            <Text fontSize="sm" mb={4}>
                {LABEL.LOGIN_WITH_EMAIL}
            </Text>
            <FormControl>
                <Box h="100px">
                    <FormLabel>{LABEL.EMAIL}</FormLabel>
                    <Input
                        type="email"
                        placeholder={LABEL.ENTER_YOUR_EMAIL}
                    />
                </Box>
                <Box h="100px">
                    <FormLabel>{LABEL.PASSWORD}</FormLabel>
                    <Input
                        type="password"
                        placeholder={LABEL.ENTER_YOUR_PASSWORD}
                    />
                </Box>
                <Box mb="10px"
                     display="flex"
                     justifyContent="center"
                >
                    <Button
                        mt={4}
                        colorScheme="teal"
                        type="submit"
                    >
                        {LABEL.SUBMIT}
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default LoginForm;
