import {Box, Button, Container, Flex, HStack, Link, useColorModeValue} from '@chakra-ui/react';
import React, {useContext} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {LABEL, PATH} from "../../language";
import {ColorModeSwitcher} from "../../ColorModeSwitcher";
import {UserContext} from '../../context/UserContext';

const NavBar: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate(PATH.HOMEPAGE);
    };

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')}>
            <Container maxW={'7xl'} px={7}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} fontSize={'2xl'}>
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
                    <HStack spacing={8} alignItems={'center'}>
                        <ColorModeSwitcher justifySelf="flex-end"/>
                        {user ? (
                            <Button onClick={handleLogout} fontSize={20} fontWeight={400}>
                                Logout
                            </Button>
                        ) : (
                            <Link as={RouterLink} to={PATH.LOGIN} fontSize={20}>
                                Login
                            </Link>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default NavBar;
