import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import {
  Flex,
  HStack,
  Image,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import ProductInfo from "./ProductInfo";
import QuantitySelector from "./QuantitySelector";
import AddBtn from "./AddBtn";
import HProductCard from "../../components/product/HProductCard";

import { LABEL } from "../../language/index";
import { CartContext } from "../../context/CartContext";
import ReviewForm from "../../components/review/ReviewForm";

interface IProduct {
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

interface ISupermarket {
  supermarketId: number;
  supermarketName: string;
  price: number;
}

interface ReqISupermarket {
  supermarket: {
    supermarketId: number;
    name: string;
  };
  price: number;
}

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [cheapestSupermarket, setCheapestSupermarket] = useState({
    supermarketId: 0,
    supermarketName: "",
    price: 0,
  });
  const [productLoaded, setProductLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { productID } = useParams<{ productID: string }>();

  const { addToCart } = useContext(CartContext);

  const toast = useToast();

  useEffect(() => {
    if (!productID) return;
    axios
      .get(
        `http://localhost:8080/product-service/products/compare/${productID}`,
      )
      .then((res) => {
        setProduct(res.data);
        const p = res.data[0];
        const product = {
          productID: p.productId,
          name: p.product.name,
          weight: p.product.weight,
          imageURL: p.product.imageURL,
          description: p.product.description,
          category: p.product.category,
          supermarketPrices: res.data.map((supermarket: ReqISupermarket) => {
            return {
              supermarketId: supermarket.supermarket.supermarketId,
              supermarketName: supermarket.supermarket.name,
              price: supermarket.price,
            };
          }),
        };
        setProduct(product);
        let cheapestSupermarket = {
          supermarketId: 0,
          supermarketName: "",
          price: 0,
        };
        product.supermarketPrices.forEach((supermarket: ISupermarket) => {
          if (cheapestSupermarket.price === 0) {
            cheapestSupermarket = supermarket;
          } else if (supermarket.price < cheapestSupermarket.price) {
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
    if (product && cheapestSupermarket) {
      addToCart({
        productID: product.productID,
        name: product.name,
        quantity: quantity,
        price: cheapestSupermarket.price,
        supermarketName: cheapestSupermarket.supermarketName,
        imageURL: product.imageURL,
      });

      toast({
        title: "Item added to cart",
        description: `Added ${quantity} x ${product.name} to cart from ${cheapestSupermarket.supermarketName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <PageContainer>
      <Flex flexDir="column" gap="10">
        <Flex gap="24">
          <Image
            src={product?.imageURL}
            fallback={<Skeleton boxSize={{ base: "132.5px", lg: "555px" }} />}
            boxSize={{ base: "132.5px", lg: "555px" }}
            objectFit="cover"
            alt={
              product
                ? `${product.name} ${product.weight}g`
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
                <Text>{product?.description}</Text>/
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
          {product?.supermarketPrices.map((supermarket, i) => {
            if (
              supermarket.supermarketId !== cheapestSupermarket.supermarketId
            ) {
              const newProduct = {
                productID: product?.productID,
                name: product?.name,
                weight: product?.weight,
                imageURL: product?.imageURL,
                supermarketName: supermarket.supermarketName,
                price: supermarket.price,
              };
              return <HProductCard key={i} product={newProduct} />;
            }
          })}
        </Flex>
      </Flex>
      <HStack align="stretch">
        <ReviewForm onSubmit={(data: { name: string; review: string }) => {}} />
      </HStack>
    </PageContainer>
  );
};

export default ProductPage;
