import React from "react";
import { render, screen } from "@testing-library/react";
import ProductInfo from "./ProductInfo";

const mockProduct = {
  productID: "1",
  name: "SampleProduct",
  weight: 500,
  imageURL: "http://sampleurl.com/image.jpg",
  supermarketPrices: [
    {
      supermarketId: 1,
      supermarketName: "SupermarketA",
      price: 10.5,
    },
    {
      supermarketId: 2,
      supermarketName: "SupermarketB",
      price: 12,
    },
  ],
  category: "Sample Category",
  description: "Sample Description",
};

const mockCheapestSupermarket = {
  supermarketId: 1,
  supermarketName: "SupermarketA",
  price: 10.5,
};

describe("<ProductInfo />", () => {
  it("renders skeletons when product is not loaded", () => {
    render(
      <ProductInfo
        product={null}
        productLoaded={false}
        cheapestSupermarket={mockCheapestSupermarket}
      />
    );

    expect(
      screen.getByTestId("product-info-name-skeleton")
    ).toBeInTheDocument();
  });

  it("renders product and supermarket details when product is loaded", () => {
    render(
      <ProductInfo
        product={mockProduct}
        productLoaded={true}
        cheapestSupermarket={mockCheapestSupermarket}
      />
    );

    expect(screen.getByText("SampleProduct 500g")).toBeInTheDocument();
    expect(screen.getByText("SupermarketA")).toBeInTheDocument();
    expect(screen.getByText("$10.5")).toBeInTheDocument();
  });

  it("does not render product details when product is null even if productLoaded is true", () => {
    render(
      <ProductInfo
        product={null}
        productLoaded={true}
        cheapestSupermarket={mockCheapestSupermarket}
      />
    );

    expect(screen.queryByText("SampleProduct 500g")).not.toBeInTheDocument();
  });
});
