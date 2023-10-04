import React from "react";
import { render } from "@testing-library/react";
import ReviewCard from "./ReviewCard"; // Adjust path if necessary
import "@testing-library/jest-dom/extend-expect";

describe("ReviewCard Component", () => {
  it("renders the reviewer's username", () => {
    const mockReview = {
      id: 1,
      username: "John",
      content: "Great product!",
      timestamp: "2023-09-28",
      rating: 5,
    };
    const { getByText } = render(<ReviewCard review={mockReview} />);
    expect(getByText("John")).toBeInTheDocument();
  });

  it("renders the review content", () => {
    const mockReview = {
      id: 1,
      username: "John",
      content: "Great product!",
      timestamp: "2023-09-28",
      rating: 5,
    };
    const { getByText } = render(<ReviewCard review={mockReview} />);
    expect(getByText("Great product!")).toBeInTheDocument();
  });

  it("renders the correct number of filled and outlined stars", () => {
    const mockReview = {
      id: 1,
      username: "John",
      content: "Good product!",
      timestamp: "2023-09-28",
      rating: 3,
    };
    const { getAllByTestId } = render(<ReviewCard review={mockReview} />);
    const filledStars = getAllByTestId("review-fill-star");
    const outlinedStars = getAllByTestId("review-outline-star");
    expect(filledStars.length).toBe(3);
    expect(outlinedStars.length).toBe(2);
  });
});
