import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { LABEL } from "../../language";
import VProductCard from "./VProductCard";
import SortOptions from "./SortOptions";

interface GalleryProps {
  products: any[];
  filterState: Record<string, boolean>;
  sortState: string;
}

type product = {
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

const getCheapestPrice = (product: product) => {
  return Math.min(...product.supermarketPrices.map((p) => p.price));
};

const Gallery = (props: GalleryProps) => {
  // React.useEffect(() => {
  //   console.log(displayProducts);
  // });

  // Determine which products to display
  const displayProducts = React.useMemo(() => {
    // Extract categories that are true from filterState
    const activeFilters = Object.keys(props.filterState).filter(
      (key) => props.filterState[key],
    );

    // Initial product filter logic
    let filteredProducts = props.products;
    if (
      activeFilters.length > 0 &&
      activeFilters.length < Object.keys(props.filterState).length
    ) {
      filteredProducts = props.products.filter((product) =>
        activeFilters.includes(product.category),
      );
    }

    // Sorting logic based on sortState
    switch (props.sortState) {
      case SortOptions.NAME_ASC:
        return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      case SortOptions.NAME_DESC:
        return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      case SortOptions.PRICE_ASC:
        return filteredProducts.sort(
          (a, b) => getCheapestPrice(a) - getCheapestPrice(b),
        );
      case SortOptions.PRICE_DESC:
        return filteredProducts.sort(
          (a, b) => getCheapestPrice(b) - getCheapestPrice(a),
        );
      default:
        return filteredProducts;
    }
  }, [props.products, props.filterState, props.sortState]);

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
