import {Box, Flex, HStack, Link, useColorModeValue} from '@chakra-ui/react';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {LABEL, PATH} from "../../language";
import {ColorModeSwitcher} from "../../ColorModeSwitcher";

const NavBar: React.FC = () => {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} fontSize={'2xl'} pl={20}>
                <HStack spacing={8} alignItems={'center'}>
                    <HStack as={'nav'} spacing={10} display={{base: 'none', md: 'flex'}}>
                        <Link as={RouterLink} to={PATH.HOMEPAGE} mr={4} fontWeight={"bold"} _hover={
                            {
                                textDecoration: "none",
                            }
                        }>
                            {LABEL.SUPER_PRICE}
                        </Link>
                        <Link as={RouterLink} to={PATH.SHOP} mr={4} fontSize={20}>
                            {LABEL.SHOP}
                        </Link>
                        <Link as={RouterLink} to={PATH.DEALS} mr={4} fontSize={20}>
                            {LABEL.DEALS}
                        </Link>
                        <Link as={RouterLink} to={PATH.ABOUT} mr={4} fontSize={20}>
                            {LABEL.ABOUT}
                        </Link>
                    </HStack>
                </HStack>
                <HStack spacing={8} alignItems={'center'} pr={10}>
                    <ColorModeSwitcher justifySelf="flex-end"/>
                    <Link as={RouterLink} to={PATH.LOGIN} mr={4} fontSize={20}>
                        Login
                    </Link>
                </HStack>
            </Flex>
        </Box>
    );
};

export default NavBar;
