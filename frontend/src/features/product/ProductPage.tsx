import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import {
  Button,
  Flex,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import ProductInfo from "./ProductInfo";
import QuantitySelector from "./QuantitySelector";
import AddBtn from "./AddBtn";
import HProductCard from "../../components/product/HProductCard";
import ReviewList from "../../components/review/ReviewList";
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

interface ProductReview {
  id: number;
  name: string;
  content: string;
  rating: number;
}

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [cheapestSupermarket, setCheapestSupermarket] = useState({
    supermarketId: 0,
    supermarketName: "",
    price: 0,
  });
  const [productLoaded, setProductLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState(false);

  const { productID } = useParams<{ productID: string }>();

  const { addToCart } = useContext(CartContext);

  const toast = useToast();

  const productServiceUrl = process.env.REACT_APP_PRODUCT_SERVICE_URL;

  useEffect(() => {
    if (!productID) return;
    axios
      .get(`${productServiceUrl}/products/compare/${productID}`)
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

    axios
      .get(`${productServiceUrl}/products/${productID}/reviews`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postReview = (data: {
    name: string;
    review: string;
    rating: number;
  }) => {
    axios
      .post(`${productServiceUrl}/products/reviews`, {
        productId: productID,
        name: data.name,
        rating: data.rating,
        content: data.review,
      })
      .then((res) => {
        // add review to reviews
        const newReview = {
          id: res.data.id,
          name: res.data.name,
          content: res.data.content,
          rating: res.data.rating,
        };
        setReviews([...reviews, newReview]);
        toast({
          title: "Review submitted",
          description: `Your review has been submitted`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        // toast error
        toast({
          title: "Error",
          description: `There was an error submitting your review`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

    setReviewForm(false);
  };

  const addToTrolley = () => {
    if (product && cheapestSupermarket) {
      addToCart({
        productID: product.productID,
        name: product.name,
        weight: product.weight,
        description: product.description,
        quantity: quantity,
        price: cheapestSupermarket.price,
        supermarketName: cheapestSupermarket.supermarketName,
        imageURL: product.imageURL,
        //supermarketPrices: [],
        //category: ""
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
      <Flex flexDir="column" gap="10" pb="20">
        <Flex gap="24">
          <Image
            src={product?.imageURL}
            fallback={<Skeleton boxSize={{ base: "132.5px", lg: "555px" }} />}
            borderRadius="20px"
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
                <Text>{product?.description}</Text>
                {/* <Text fontSize="17px"> */}
                {/* {LABEL.INGREDIENTS}: {"To be implemented"} */}
                {/* </Text> */}
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
        <Button
          onClick={() => setReviewForm(!reviewForm)}
          colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
          bg={useColorModeValue("black", "white")}
          w="50%"
        >
          Write Review
        </Button>
        {reviewForm && (
          <ReviewForm
            onSubmit={(data: {
              name: string;
              review: string;
              rating: number;
            }) => {
              postReview(data);
            }}
          />
        )}
        <ReviewList reviews={reviews} />
      </Flex>
    </PageContainer>
  );
};

export default ProductPage;
