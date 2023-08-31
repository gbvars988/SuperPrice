import React, {useState} from 'react';
import {Box, Heading, HStack, VStack} from '@chakra-ui/react';
import PageContainer from '../../components/common/PageContainer';
import Categories from './Categories';
import {LABEL} from '../../language';
import Filter from "./Filter";

const ShopPage: React.FC = () => {
    const initialFilterState = Object.fromEntries(
        Object.values(Categories).map(category => [category, false])
    ) as Record<string, boolean>;

    const [filterState, setFilterState] = useState<Record<string, boolean>>(initialFilterState);

    // TODO: use filterState to filter products later once product data is available

    return (
        <PageContainer>
            <VStack spacing={8} align={"center"}>

                <Box w={"100%"} textAlign={"left"}>
                    <Heading as="h2" size="xl">
                        {LABEL.SHOP}
                    </Heading>
                </Box>

                <HStack spacing={12} align={"stretch"} w={"100%"}>

                    <Box w={"25%"}>
                        <Box pr={4}>
                            <Filter filterState={filterState} setFilterState={setFilterState}/>
                        </Box>
                    </Box>

                    {/* product gallery Placeholder */}
                    <Box w={"75%"}>
                        <Heading as="h4" size="md" textAlign={"left"}>
                            {LABEL.PRODUCTS}
                        </Heading>
                        <Box bg={"gray.200"} p={4} mt={4}>
                            Product gallery placeholder - add component later
                        </Box>
                    </Box>

                </HStack>
            </VStack>
        </PageContainer>
    );
};

export default ShopPage;
