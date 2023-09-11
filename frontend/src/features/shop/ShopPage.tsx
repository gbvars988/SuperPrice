import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";
import Categories from "./Categories";
import { LABEL } from "../../language";
import Filter from "./Filter";
import Gallery from "./Gallery";
import SortButton from "../../components/sort/SortButton";

const ShopPage: React.FC = () => {
  const initialFilterState = Object.fromEntries(
    Object.values(Categories).map((category) => [category, false])
  ) as Record<string, boolean>;

  const [filterState, setFilterState] =
    useState<Record<string, boolean>>(initialFilterState);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TOOD: Replace with actual API call
    axios
      .get("/mocks/products.json")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // TODO: use filterState to filter products later once product data is available

  return (
    <PageContainer>
      <VStack spacing={8} align={"center"}>
        <Box w={"100%"}>
          <HStack justify="space-between">
            <Heading as="h2" size="xl">
              {LABEL.SHOP}
            </Heading>
            <SortButton></SortButton>
          </HStack>
        </Box>

        <HStack spacing={12} align={"stretch"} w={"100%"}>
          <Box w={"25%"}>
            <Box pr={4}>
              <Filter
                filterState={filterState}
                setFilterState={setFilterState}
              />
            </Box>
          </Box>

          <Gallery products={products} />
        </HStack>
      </VStack>
    </PageContainer>
  );
};

export default ShopPage;
