import React from 'react';
import {Box, Button, Heading, Image, VStack} from '@chakra-ui/react';
import {LABEL, PATH} from "../../language";
import {useNavigate} from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import CartDrawer from '../cart/CartDrawer';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        
        <PageContainer>
            <VStack spacing={8} align={"center"}>
                <Box>
                    <Heading as="h1" size="2xl" textAlign={"center"} lineHeight={"60px"}>
                        {LABEL.HEAD_LINE}
                    </Heading>
                </Box>
                <Box>
                    <Button colorScheme="blue" onClick={() => {
                        navigate(PATH.SHOP);
                    }}
                    >{LABEL.SHOP_ALL}</Button>
                </Box>
                <Box>
                    <Image
                        src="https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        w={"100%"}
                    />
                </Box>
            </VStack>
        </PageContainer>
    );
};

export default HomePage;
