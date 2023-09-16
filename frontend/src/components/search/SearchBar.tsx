import React, {ChangeEvent} from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

// @ts-ignore
const SearchBar = ({keyword, onChange}) => {
    return (
        <>
            <InputGroup borderRadius={5} size="md">
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.600" />}
                />
                <Input
                    value={keyword}
                    variant="outline"
                    type="text"
                    placeholder="Search products"
                    fontSize={20}
                    htmlSize={30}
                    onChange={(e) => onChange(e.target.value)}
                />
            </InputGroup>
        </>
    );
};

export default SearchBar;