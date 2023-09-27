import React from "react";
import { Select} from "@chakra-ui/react";
import {LABEL} from "../../language";
import SortOptions from "../../features/shop/SortOptions";

const SortButton = () => {
    return (
    <Select placeholder={LABEL.SORT} maxW={150} >
        {Object.values(SortOptions).map((option, i) => (
            <option key={i} value={option}>{LABEL[option]}</option>
        ))}
    </Select>
    );
};

export default SortButton;