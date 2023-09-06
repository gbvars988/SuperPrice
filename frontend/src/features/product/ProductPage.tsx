import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, useParams } from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import { Flex, Image, Text, Skeleton } from "@chakra-ui/react";
import ProductInfo from "./ProductInfo";
import QuantitySelector from "./QuantitySelector";
import AddBtn from "./AddBtn";
import HProductCard from "../../components/product/HProductCard";

import { LABEL } from "../../language/index";

interface IProduct {
  ProductID: number;
  Name: string;
  Weight: number;
  ImageURL: string;
  Description: string;
  Supermarkets: {
    SupermarketID: string;
    Name: string;
    Price: number;
  }[];
}

interface ISupermarket {
  SupermarketID: string;
  Name: string;
  Price: number;
}

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [cheapestSupermarket, setCheapestSupermarket] = useState({
    SupermarketID: "",
    Name: "",
    Price: 0,
  });
  const [productLoaded, setProductLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { productID } = useParams<{ productID: string }>();

  useEffect(() => {
    if (!productID) return;
    // TOOD: Replace with actual API call
    axios
      .get("/mocks/products.json")
      .then((res) => {
        const product = res.data.find(
          (product: IProduct) => product.ProductID === parseInt(productID)
        );
        setProduct(product);
        let cheapestSupermarket = {
          SupermarketID: "",
          Name: "",
          Price: 0,
        };
        product.Supermarkets.forEach((supermarket: ISupermarket) => {
          if (cheapestSupermarket.Price === 0) {
            cheapestSupermarket = supermarket;
          } else if (supermarket.Price < cheapestSupermarket.Price) {
            cheapestSupermarket = supermarket;
          }
        });
        setCheapestSupermarket(cheapestSupermarket);
        setProductLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToTrolley = () => {
    console.log("TODO: Add to trolley");
  };

  return (
    <PageContainer>
      <Flex flexDir="column" gap="10">
        <Flex gap="24">
          <Image
            src={product?.ImageURL}
            fallback={<Skeleton boxSize={{ base: "132.5px", lg: "555px" }} />}
            boxSize={{ base: "132.5px", lg: "555px" }}
            alt={
              product
                ? `${product.Name} ${product.Weight}g`
                : "Loading product image"
            }
          ></Image>
          <Flex flexDir="column" gap="10">
            <Flex flexDir="column" gap="5">
              <ProductInfo
                product={product}
                productLoaded={productLoaded}
                cheapestSupermarket={cheapestSupermarket}
              />
              <Flex flexDir="column" gap="4">
                <Text>{product?.Description}</Text>
                <Text fontSize="17px">
                  {LABEL.INGREDIENTS}: {"To be implemented"}
                </Text>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </Flex>
            </Flex>
            <AddBtn onClick={addToTrolley} />
          </Flex>
        </Flex>
        <Flex gap="3">
          {product?.Supermarkets.map((supermarket, i) => {
            if (
              supermarket.SupermarketID !== cheapestSupermarket.SupermarketID
            ) {
              const newProduct = {
                ProductID: product?.ProductID,
                Name: product?.Name,
                Weight: product?.Weight,
                ImageURL: product?.ImageURL,
                SupermarketName: supermarket.Name,
                Price: supermarket.Price,
              };
              return <HProductCard product={newProduct} />;
            }
          })}
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default ProductPage;
