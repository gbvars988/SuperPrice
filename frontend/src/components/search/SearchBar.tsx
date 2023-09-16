import React from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const SearchBar = () => {
    return (
        <>
            <InputGroup borderRadius={5} size="md">
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.600" />}
                />
                <Input variant="outline" type="text" placeholder="Search products" fontSize={20} htmlSize={30} width='auto' />
            </InputGroup>
        </>
    );
};

export default SearchBar;