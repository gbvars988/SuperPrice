import React from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";

import {
  AiFillStar as FillStar,
  AiOutlineStar as OutlineStar,
} from "react-icons/ai";

interface ProductReview {
  id: number;
  username: string;
  content: string;
  timestamp: string;
  rating: number;
}

type Props = {
  review: ProductReview;
};

const ReviewCard = (props: Props) => {
  return (
    <Flex flexDirection="column">
      <Flex align="center" gap="2">
        <Text fontSize="lg">{props.review.username}</Text>
        {/* Star rating */}
        <Flex gap="1">
          {[...Array(5)].map((_, i) =>
            i < props.review.rating ? (
              <FillStar key={i} data-testid="review-fill-star" />
            ) : (
              <OutlineStar key={i} data-testid="review-outline-star" />
            ),
          )}
        </Flex>
        <Spacer />
      </Flex>
      <Text fontSize="md">{props.review.content}</Text>
    </Flex>
  );
};

export default ReviewCard;
