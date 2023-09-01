import React from "react";
import { Box, Heading, useColorModeValue, Flex } from "@chakra-ui/react";
import { LABEL } from "../../language";

interface GalleryProps {
  products: any[];
}

const Gallery = (props: GalleryProps) => {
  return (
    <Box w={"75%"}>
      <Heading as="h4" size="md" textAlign={"left"}>
        {LABEL.PRODUCTS}
      </Heading>
      <Flex wrap={"wrap"} gap={"2"}>
        {props.products.map((product, i) => (
          // TODO: Replace with vertical product card component
          <Box key={i}>{product.Name}</Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Gallery;
