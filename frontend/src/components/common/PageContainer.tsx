import React, {ReactNode} from 'react';
import {Container} from '@chakra-ui/react';

interface PageContainerProps {
    children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({children}) => {
    return (
        <Container maxW="8xl" pt={20} px={7}>
            {children}
        </Container>
    );
};

export default PageContainer;
