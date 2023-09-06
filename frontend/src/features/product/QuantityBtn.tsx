import React from "react";

import { Flex, Box } from "@chakra-ui/react";

type Props = {
  icon: React.ReactNode;
  onClick: () => void;
  type: "plus" | "minus";
};

const QuantityBtn = (props: Props) => {
  return (
    <Flex
      h="50px"
      p="10px"
      align="center"
      onClick={props.onClick}
      role="group"
      cursor="pointer"
      _hover={{
        bg: "gray.100",
      }}
      transition={"all 0.2s ease-in-out"}
      data-testid={`quantity-btn-${props.type}`}
    >
      <Box
        _groupHover={{
          transform: "scale(1.1)",
        }}
        transition={"all 0.2s ease-in-out"}
      >
        {props.icon}
      </Box>
    </Flex>
  );
};

export default QuantityBtn;
