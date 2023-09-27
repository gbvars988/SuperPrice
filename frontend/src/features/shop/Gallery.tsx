import React from "react";
import { Box, Heading, useColorModeValue, Flex } from "@chakra-ui/react";
import { LABEL } from "../../language";
import VProductCard from "./VProductCard";

interface GalleryProps {
  products: any[];
  filterState: Record<string, boolean>;
}

const Gallery = (props: GalleryProps) => {
  React.useEffect(() => {
    console.log(displayProducts)
  });

  // Determine which products to display
  const displayProducts = React.useMemo(() => {
    // Extract categories that are true from filterState
    const activeFilters = Object.keys(props.filterState).filter(key => props.filterState[key]);

    // If no filters are active, or all filters are active, display all products
    if (activeFilters.length === 0 || activeFilters.length === Object.keys(props.filterState).length) {
      return props.products;
    }

    // Filter products that match the active filters
    return props.products.filter(product => activeFilters.includes(product.category));
  }, [props.products, props.filterState]);

  return (
    <Box w={"75%"}>
      {displayProducts.length === 0 ? (
        <Heading as="h4" size="md" textAlign={"left"}>
          {LABEL.NO_PRODUCTS}
        </Heading>
      ) : (
        <Flex wrap={"wrap"} gap={"3"}>
          {displayProducts.map((product, i) => (
            <VProductCard key={i} product={product} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Gallery;
