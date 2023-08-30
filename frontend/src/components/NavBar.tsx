import { Box, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <Box p={4}>
            <Link as={RouterLink} to="/" mr={4}>
                Home
            </Link>
            {/*style and create more links later - Ledy's ticket*/}
        </Box>
    );
};

export default NavBar;
