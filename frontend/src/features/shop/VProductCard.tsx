import { useEffect, useState } from "react";
import { Flex, Link, Image, Text, Skeleton } from "@chakra-ui/react";

interface VProductCardProps {
  product: {
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
  };
}

const VProductCard = (props: VProductCardProps) => {
  const [cheapeastSupermarket, setCheapestSupermarket] = useState({
    supermarketId: 0,
    supermarketName: "",
    price: 0,
  });
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Find the cheapest supermarket
    let cheapestSupermarket = {
      supermarketId: 0,
      supermarketName: "",
      price: 0,
    };
    props.product.supermarketPrices.forEach((supermarket) => {
      if (cheapestSupermarket.price === 0) {
        cheapestSupermarket = supermarket;
      } else if (supermarket.price < cheapestSupermarket.price) {
        cheapestSupermarket = supermarket;
      }
    });
    setCheapestSupermarket(cheapestSupermarket);
  }, []);

  return (
    <Link
      href={`/shop/${props.product.productID}`}
      _hover={{ textDecoration: "none" }}
      _focus={{ textDecoration: "none" }}
      _active={{ textDecoration: "none" }}
    >
      <Flex
        flexDir="column"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.02) translateY(-5px)",
        }}
        _active={{
          transform: "scale(0.95) translateY(0px)",
        }}
        transition={"all 0.2s ease-in-out"}
        role="group"
        maxW={{ base: "132.5px", lg: "265px" }}
      >
        <Skeleton
          isLoaded={imgLoaded}
          boxSize={{ base: "132.5px", lg: "265px" }}
        >
          <Image
            src={props.product.imageURL}
            alt={props.product.name + " " + props.product.weight + "g"}
            boxSize={{ base: "132.5px", lg: "265px" }}
            objectFit="cover"
            userSelect={"none"}
            onLoad={() => setImgLoaded(true)}
          ></Image>
        </Skeleton>
        <Flex gap="2">
          <Flex flexDir="column">
            <Text fontWeight="bold">{`${props.product.name} ${props.product.weight}g`}</Text>
            <Flex gap="3">
              <Flex flexDir="column">
                <Text fontWeight="bold">
                  {cheapeastSupermarket.supermarketName}
                </Text>
                <Text>${cheapeastSupermarket.price}</Text>
              </Flex>
              {props.product.supermarketPrices.map((supermarket, i) => {
                if (
                  supermarket.supermarketId !==
                  cheapeastSupermarket.supermarketId
                ) {
                  return (
                    <Flex
                      flexDir="column"
                      key={i}
                      opacity="0"
                      _groupHover={{
                        opacity: "1",
                      }}
                      transition={"all 0.2s ease-in-out"}
                      display={{ base: "none", lg: "flex" }}
                    >
                      <Text fontWeight="bold">
                        {supermarket.supermarketName}
                      </Text>
                      <Text>${supermarket.price}</Text>
                    </Flex>
                  );
                }
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default VProductCard;
