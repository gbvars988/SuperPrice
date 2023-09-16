import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VProductCard from "./VProductCard";

describe("VProductCard", () => {
  const mockProduct = {
    productID: "1",
    name: "Test Product",
    weight: 100,
    imageURL: "https://example.com/image.jpg",
    supermarketPrices: [
      {
        supermarketId: 1,
        supermarketName: "Supermarket 1",
        price: 50,
      },
      {
        supermarketId: 2,
        supermarketName: "Supermarket 2",
        price: 40,
      },
    ],
    category: "Test Category",
    description: "Test Description",
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
