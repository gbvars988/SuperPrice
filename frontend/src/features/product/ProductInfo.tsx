import React from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";

type Props = {
  product: IProduct | null;
  productLoaded: boolean;
  cheapestSupermarket: {
    SupermarketID: string;
    Name: string;
    Price: number;
  };
};

interface IProduct {
  ProductID: number;
  Name: string;
  Weight: number;
  ImageURL: string;
  Supermarkets: {
    SupermarketID: string;
    Name: string;
    Price: number;
  }[];
}

const ProductInfo = (props: Props) => {
  return (
    <Flex flexDir="column">
      <Skeleton
        isLoaded={props.productLoaded}
        data-testid="product-info-name-skeleton"
      >
        <Text
          fontSize="36px"
          fontWeight="semibold"
        >{`${props.product?.Name} ${props.product?.Weight}g`}</Text>
      </Skeleton>
      <Skeleton isLoaded={props.productLoaded}>
        <Text fontSize="36px" fontWeight="semibold">
          {props.cheapestSupermarket.Name}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={props.productLoaded}>
        <Text fontSize="24px">${props.cheapestSupermarket.Price}</Text>
      </Skeleton>
    </Flex>
  );
};

export default ProductInfo;
