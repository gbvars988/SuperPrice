import React from 'react';
import {Box, Button, Container, Heading, Image, VStack} from '@chakra-ui/react';
import {LABEL} from "../../language";

const HomePage: React.FC = () => {
    return (
        <Container maxW="3xl" pt={20}>
            <VStack spacing={8} align={"center"}>
                <Box>
                    <Heading as="h1" size="2xl" textAlign={"center"} lineHeight={"60px"}>
                        {LABEL.HEAD_LINE}
                    </Heading>
                </Box>
                <Box>
                    <Button colorScheme="blue">{LABEL.SHOP_ALL}</Button>
                </Box>
                <Box>
                    <Image
                        src="https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        w={"100%"}
                    />
                </Box>
            </VStack>
        </Container>
    );
};


export default HomePage;
