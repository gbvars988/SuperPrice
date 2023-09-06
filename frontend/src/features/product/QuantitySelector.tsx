import React from "react";
import { Flex, Text, Box, Spacer } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";

import QuantityBtn from "./QuantityBtn";

type Props = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const QuantitySelector = (props: Props) => {
  const increaseQuantity = () => {
    props.setQuantity(props.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (props.quantity > 1) {
      props.setQuantity(props.quantity - 1);
    }
  };
  return (
    <Flex
      w="full"
      maxW="167px"
      justifyItems="center"
      alignItems="center"
      border="1px solid black"
    >
      <QuantityBtn
        icon={<FaMinus color="gray" />}
        onClick={decreaseQuantity}
        type="minus"
      />
      <Spacer />
      <Box fontSize="18px" userSelect={"none"}>
        {props.quantity}
      </Box>
      <Spacer />
      <QuantityBtn
        icon={<FaPlus color="gray" />}
        onClick={increaseQuantity}
        type="plus"
      />
    </Flex>
  );
};

export default QuantitySelector;
