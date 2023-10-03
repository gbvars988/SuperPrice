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
  onSubmit: (data: { name: string; review: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", review: "" });

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
    setFormData({ name: "", review: "" });
  };

  return (
    <Box display="flex" w="50%">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Flex gap="2" align="center" flexDirection="column" w="full">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
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
