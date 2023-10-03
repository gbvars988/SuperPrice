import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { LABEL } from "../../language/index";

import ReviewCard from "./ReviewCard";

interface ProductReview {
  id: number;
  username: string;
  content: string;
  timestamp: string;
  rating: number;
}

interface ReviewListProps {
  reviews: ProductReview[];
}

const ReviewList = (props: ReviewListProps) => {
  return (
    <Flex flexDirection="column" gap="3" w="50%">
      <Text fontSize="2xl" fontWeight="semibold">
        {LABEL.REVIEWS}
      </Text>
      {props.reviews.length > 0 ? (
        <Flex flexDirection="column" gap="2">
          {props.reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </Flex>
      ) : (
        <Text>{LABEL.NO_REVIEWS}</Text>
      )}
    </Flex>
  );
};

export default ReviewList;
