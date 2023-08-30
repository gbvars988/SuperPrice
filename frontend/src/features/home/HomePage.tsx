import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import {LABEL} from "../../language";

const HomePage: React.FC = () => {
    console.log("Rendering HomePage");
    return (
        <Box>
            <Text fontSize="xl">{LABEL.HEAD_LINE}</Text>
        </Box>
    );
};

export default HomePage;
