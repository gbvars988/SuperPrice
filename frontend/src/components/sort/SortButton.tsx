import React from "react";
import { Select} from "@chakra-ui/react";
import {LABEL} from "../../language";

const SortButton = () => {
    return (
    <Select placeholder={LABEL.SORT} maxW={100} >
        <option value='apiCallSortByName'>{LABEL.NAME}</option>
        <option value='apiCallSortByPrice'>{LABEL.PRICE}</option>
    </Select>
    );
};

export default SortButton;