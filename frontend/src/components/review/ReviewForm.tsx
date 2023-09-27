import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
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
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="review" isRequired>
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
        </Stack>
      </form>
    </Box>
  );
};

export default ReviewForm;
