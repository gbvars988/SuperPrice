import React from 'react';
import {Box, Button, FormControl, FormLabel, Heading, Input, Text} from '@chakra-ui/react';
import {LABEL} from "../../language";

const SignUpForm: React.FC = () => {
    return (
        <Box borderWidth={1} borderRadius="md" p={10} minWidth={"450px"}>
            <Heading size="lg" mb={2}>
                {LABEL.WELCOME}
            </Heading>
            <Text fontSize={"xl"} color={"gray.400"} mb={5}>
                {LABEL.SIGN_UP_WITH_EMAIL}
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
                <Box h="100px">
                    <FormLabel>{LABEL.CONFIRM_PASSWORD}</FormLabel>
                    <Input
                        type="password"
                        placeholder={LABEL.CONFIRM_YOUR_PASSWORD}
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <Button
                        colorScheme="teal"
                        type="submit"
                    >
                        {LABEL.SIGN_UP}
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default SignUpForm;
