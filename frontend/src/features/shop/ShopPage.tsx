import React from 'react';
import {Box, Heading, HStack, VStack} from '@chakra-ui/react';
import PageContainer from "../../components/common/PageContainer";

const ShopPage: React.FC = () => {

    return (
        <PageContainer>
            <VStack spacing={8} align={"center"}>

                <Box w={"100%"} textAlign={"left"}>
                    <Heading as="h2" size="xl">
                        Shop
                    </Heading>
                </Box>

                <HStack spacing={8} align={"stretch"} w={"100%"}>

                    <Box w={"25%"}>
                        <Heading as="h4" size="md" textAlign={"left"}>
                            Filter
                        </Heading>
                        <Box bg={"gray.200"} p={4} mt={4}>
                            Filter Component Placeholder
                        </Box>
                    </Box>

                    {/* product gallery Placeholder */}
                    <Box w={"75%"}>
                        <Heading as="h4" size="md" textAlign={"left"}>
                            Products
                        </Heading>
                        <Box bg={"gray.200"} p={4} mt={4}>
                            Product Gallery Placeholder
                        </Box>
                    </Box>

                </HStack>
            </VStack>
        </PageContainer>
    );
};

export default ShopPage;
