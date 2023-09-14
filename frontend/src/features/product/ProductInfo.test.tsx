import React from "react";
import { render, screen } from "@testing-library/react";
import ProductInfo from "./ProductInfo";

const mockProduct = {
  ProductID: 1,
  Name: "SampleProduct",
  Weight: 500,
  ImageURL: "http://sampleurl.com/image.jpg",
  Supermarkets: [
    {
      SupermarketID: "1",
      Name: "SupermarketA",
      Price: 10.5,
    },
    {
      SupermarketID: "2",
      Name: "SupermarketB",
      Price: 12,
    },
  ],
};

const mockCheapestSupermarket = {
  SupermarketID: "1",
  Name: "SupermarketA",
  Price: 10.5,
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
