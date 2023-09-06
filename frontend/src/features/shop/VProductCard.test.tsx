import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VProductCard from "./VProductCard";

describe("VProductCard", () => {
  const mockProduct = {
    ProductID: "1",
    Name: "Test Product",
    Weight: 100,
    ImageURL: "https://example.com/image.jpg",
    Supermarkets: [
      {
        SupermarketID: "1",
        Name: "Supermarket 1",
        Price: 50,
      },
      {
        SupermarketID: "2",
        Name: "Supermarket 2",
        Price: 40,
      },
    ],
  };

  it("renders the product name and weight", () => {
    const { getByText } = render(<VProductCard product={mockProduct} />);
    expect(getByText("Test Product 100g")).toBeInTheDocument();
  });

  it("renders the cheapest supermarket", () => {
    const { getByText } = render(<VProductCard product={mockProduct} />);
    expect(getByText("Supermarket 2")).toBeInTheDocument();
    expect(getByText("$40")).toBeInTheDocument();
  });
});
