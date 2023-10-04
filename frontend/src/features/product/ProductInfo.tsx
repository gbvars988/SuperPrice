import React from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";

type Props = {
  product: IProduct | null;
  productLoaded: boolean;
  cheapestSupermarket: {
    supermarketId: number;
    supermarketName: string;
    price: number;
  };
};

export interface IProduct {
  productID: string;
  name: string;
  weight: number;
  imageURL: string;
  supermarketPrices: {
    supermarketId: number;
    supermarketName: string;
    price: number;
  }[];
  category: string;
  description: string;
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
        >{`${props.product?.name} ${props.product?.weight}g`}</Text>
      </Skeleton>
      <Skeleton isLoaded={props.productLoaded}>
        <Text fontSize="36px" fontWeight="semibold">
          {props.cheapestSupermarket.supermarketName}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={props.productLoaded}>
        <Text fontSize="24px">${props.cheapestSupermarket.price}</Text>
      </Skeleton>
    </Flex>
  );
};

export default ProductInfo;
