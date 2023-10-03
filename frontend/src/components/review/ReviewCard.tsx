import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Flex, Text, Spacer } from "@chakra-ui/react";

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
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  return (
    <Flex flexDirection="column">
      <Flex align="center" gap="2">
        <Text fontSize="lg">{props.review.username}</Text>
        {/* Star rating */}
        <Flex gap="1">
          {[...Array(5)].map((_, i) =>
            i < props.review.rating ? (
              <FillStar key={i} />
            ) : (
              <OutlineStar key={i} />
            ),
          )}
        </Flex>
        <Spacer />
        {/* <Text justifySelf={"flex-end"}>
          {timeAgo.format(new Date(props.review.timestamp))}
        </Text> */}
      </Flex>
      <Text fontSize="md">{props.review.content}</Text>
    </Flex>
  );
};

export default ReviewCard;
