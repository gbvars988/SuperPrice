import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";

import { LABEL } from "../../language/index";

type Props = {
  onClick: () => void;
};

const AddBtn = (props: Props) => {
  return (
    <Button
      onClick={props.onClick}
      colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
      bg={useColorModeValue("black", "white")}
      h="50px"
      w="198px"
      borderRadius="10px"
    >
      {LABEL.ADD_TO_TROLLEY}
    </Button>
  );
};

export default AddBtn;
