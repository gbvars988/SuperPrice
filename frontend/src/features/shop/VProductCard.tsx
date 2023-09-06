import { useEffect, useState } from "react";
import { Flex, Link, Image, Text, Skeleton } from "@chakra-ui/react";

interface VProductCardProps {
  product: {
    ProductID: string;
    Name: string;
    Weight: number;
    ImageURL: string;
    Supermarkets: {
      SupermarketID: string;
      Name: string;
      Price: number;
    }[];
  };
}

const VProductCard = (props: VProductCardProps) => {
  const [cheapeastSupermarket, setCheapestSupermarket] = useState({
    SupermarketID: "",
    Name: "",
    Price: 0,
  });
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Find the cheapest supermarket
    let cheapestSupermarket = {
      SupermarketID: "",
      Name: "",
      Price: 0,
    };
    props.product.Supermarkets.forEach((supermarket) => {
      if (cheapestSupermarket.Price === 0) {
        cheapestSupermarket = supermarket;
      } else if (supermarket.Price < cheapestSupermarket.Price) {
        cheapestSupermarket = supermarket;
      }
    });
    setCheapestSupermarket(cheapestSupermarket);
  }, []);

  return (
    <Link
      href={`/shop/${props.product.ProductID}`}
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
            src={props.product.ImageURL}
            alt={props.product.Name + " " + props.product.Weight + "g"}
            boxSize={{ base: "132.5px", lg: "265px" }}
            objectFit="cover"
            userSelect={"none"}
            onLoad={() => setImgLoaded(true)}
          ></Image>
        </Skeleton>
        <Flex gap="2">
          <Flex flexDir="column">
            <Text fontWeight="bold">{`${props.product.Name} ${props.product.Weight}g`}</Text>
            <Flex gap="3">
              <Flex flexDir="column">
                <Text fontWeight="bold">{cheapeastSupermarket.Name}</Text>
                <Text>${cheapeastSupermarket.Price}</Text>
              </Flex>
              {props.product.Supermarkets.map((supermarket, i) => {
                if (
                  supermarket.SupermarketID !==
                  cheapeastSupermarket.SupermarketID
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
                      <Text fontWeight="bold">{supermarket.Name}</Text>
                      <Text>${supermarket.Price}</Text>
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
