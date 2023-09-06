import React from "react";
import { Box, Heading, useColorModeValue, Flex } from "@chakra-ui/react";
import { LABEL } from "../../language";
import VProductCard from "./VProductCard";

interface GalleryProps {
  products: any[];
}

const Gallery = (props: GalleryProps) => {
  return (
    <Box w={"75%"}>
      {/* <Heading as="h4" size="md" textAlign={"left"}>
        {LABEL.PRODUCTS}
      </Heading> */}
      {props.products.length === 0 ? (
        <Heading as="h4" size="md" textAlign={"left"}>
          {LABEL.NO_PRODUCTS}
        </Heading>
      ) : (
        <Flex wrap={"wrap"} gap={"3"}>
          {props.products.map((product, i) => (
            <VProductCard key={i} product={product} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Gallery;
