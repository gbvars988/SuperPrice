import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";
import Categories from "./Categories";
import { LABEL } from "../../language";
import Filter from "./Filter";
import Gallery from "./Gallery";
import SortButton from "../../components/sort/SortButton";
import SearchBar from "../../components/search/SearchBar";
import SortOptions from "./SortOptions";

const ShopPage: React.FC = () => {
  const initialFilterState = Object.fromEntries(
    Object.values(Categories).map((category) => [category, false]),
  ) as Record<string, boolean>;

  const [filterState, setFilterState] =
    useState<Record<string, boolean>>(initialFilterState);

  const [sortState, setSortState] = useState(SortOptions.NAME_ASC);

  const [products, setProducts] = useState([]);

  const [keyword, setKeyword] = useState("");

  const productServiceUrl = process.env.REACT_APP_PRODUCT_SERVICE_URL;

  useEffect(() => {
    axios
      .get(`${productServiceUrl}/products/all`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateKeyword = (keyword: string) => {
    axios
      .get(
        `${productServiceUrl}/products/search?query=${keyword.toLowerCase()}`,
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    http: setKeyword(keyword);
  };

  // TODO: use filterState to filter products later once product data is available

  return (
    <PageContainer>
      <VStack spacing={8} align={"center"}>
        <Box w={"100%"}>
          <HStack justify="space-between">
            <Heading as="h2" size="xl" paddingRight={20}>
              {LABEL.SHOP}
            </Heading>
            <SearchBar keyword={keyword} onChange={updateKeyword} />
            <SortButton
              sortState={sortState}
              setSortState={setSortState}
            ></SortButton>
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

          <Gallery
            products={products}
            filterState={filterState}
            sortState={sortState}
          />
        </HStack>
      </VStack>
    </PageContainer>
  );
};

export default ShopPage;
