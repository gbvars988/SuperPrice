import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HProductCard from "./HProductCard"; // Adjust the path as needed

describe("HProductCard", () => {
  interface IProduct {
    productID: string;
    name: string;
    weight: number;
    imageURL: string;
    price: number;
    supermarketName: string;
  }

  const mockProduct: IProduct = {
    productID: "123",
    name: "SampleProduct",
    weight: 500,
    imageURL: "http://sampleurl.com/image.jpg",
    price: 10.5,
    supermarketName: "SupermarketA",
  };

  it("renders the product details", () => {
    render(<HProductCard product={mockProduct} />);

    // Check for product name and weight
    expect(screen.getByText("SampleProduct 500g")).toBeInTheDocument();

    // Check for supermarket name
    expect(screen.getByText("SupermarketA")).toBeInTheDocument();

    // Check for price
    expect(screen.getByText("$10.5")).toBeInTheDocument();
  });

});