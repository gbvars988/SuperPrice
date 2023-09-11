import React from "react";
import {
    Button,
    Menu, MenuButton, MenuItem, MenuList,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {LABEL} from "../../language";

const SortButton = () => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {LABEL.SORT}
            </MenuButton>
            <MenuList>
                <MenuItem>{LABEL.NAME}</MenuItem>
                <MenuItem>{LABEL.PRICE}</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default SortButton;