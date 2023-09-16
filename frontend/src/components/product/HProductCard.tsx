import React from "react";
import { Flex, Text, Image, Skeleton } from "@chakra-ui/react";

type Props = {
  product: IProduct;
};

interface IProduct {
  productID: string;
  name: string;
  weight: number;
  imageURL: string;
  price: number;
  supermarketName: string;
}

const HProductCard = (props: Props) => {
  return (
    <Flex gap="2" w="full" maxW="424px" border="1px" borderColor="gray.200">
      <Image
        src={props.product?.imageURL}
        boxSize={{ base: "129px", lg: "129px" }}
        fallback={<Skeleton boxSize={{ base: "129px", lg: "129px" }} />}
      ></Image>
      <Flex flexDir="column" py="2">
        <Text fontWeight="bold">
          {props.product.name} {props.product.weight}g
        </Text>
        <Text fontWeight="bold">{props.product.supermarketName}</Text>
        <Text>${props.product.price}</Text>
      </Flex>
    </Flex>
  );
};

export default HProductCard;
