import React from "react";
import { render } from "@testing-library/react";
import ReviewList from "./ReviewList";
import "@testing-library/jest-dom/extend-expect";
import { LABEL } from "../../language/index";

describe("ReviewList Component", () => {
  it("renders reviews title", () => {
    const { getByText } = render(<ReviewList reviews={[]} />);
    expect(getByText(LABEL.REVIEWS)).toBeInTheDocument();
  });

  it("renders no reviews message when no reviews are provided", () => {
    const { getByText } = render(<ReviewList reviews={[]} />);
    expect(getByText(LABEL.NO_REVIEWS)).toBeInTheDocument();
  });

  it("renders review cards when reviews are provided", () => {
    const mockReviews = [
      {
        id: 1,
        username: "John",
        content: "Great product!",
        timestamp: "2023-09-28",
        rating: 5,
      },
    ];
    const { getByText } = render(<ReviewList reviews={mockReviews} />);
    expect(getByText("Great product!")).toBeInTheDocument();
    expect(getByText("John")).toBeInTheDocument();
  });
});
