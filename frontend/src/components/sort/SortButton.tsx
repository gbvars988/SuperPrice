import React from "react";
import { Select } from "@chakra-ui/react";
import { LABEL } from "../../language";
import SortOptions from "../../features/shop/SortOptions";

interface SortButtonProps {
  sortState: SortOptions;
  setSortState: React.Dispatch<React.SetStateAction<SortOptions>>;
}

const SortButton = (props: SortButtonProps) => {
  return (
    <Select
      placeholder={LABEL.SORT}
      value={props.sortState}
      onChange={(e) => props.setSortState(e.target.value as SortOptions)}
      maxW={150}
    >
      {Object.values(SortOptions).map((option, i) => (
        <option key={i} value={option}>
          {LABEL[option]}
        </option>
      ))}
    </Select>
  );
};

export default SortButton;
