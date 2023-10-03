import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface ReviewFormProps {
  onSubmit: (data: { name: string; review: string; rating: number }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", review: "", rating: 0 });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", review: "", rating: 0 });
  };

  return (
    <Box display="flex" w="50%">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Flex gap="2" align="center" flexDirection="column" w="full">
          <Flex w="full" gap="2">
            <FormControl id="name" isRequired w="175%">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="rating" isRequired>
              <FormLabel>Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                max={5}
                min={0}
              />
            </FormControl>
          </Flex>
          <FormControl id="review" isRequired w="full">
            <FormLabel>Review</FormLabel>
            <Textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
            bg={useColorModeValue("black", "white")}
          >
            Submit Review
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ReviewForm;
