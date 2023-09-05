import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Gallery from "./Gallery";
import { LABEL } from "../../language";

describe("<Gallery />", () => {
  test("it renders a list of products", async () => {
    const mockProducts = [
      { Name: "Apple" },
      { Name: "Banana" },
      { Name: "Cherry" },
    ];

    render(<Gallery products={mockProducts} />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  test("it displays the PRODUCTS heading", async () => {
    const mockProducts = [
      {
        ProductID: 1,
        Name: "Apple",
        Description: "Fresh red apples.",
        Category: "Fruit",
        ImageURL: "https://source.unsplash.com/featured/?apple",
        Weight: 150,
        Supermarkets: [
          { SupermarketID: 1, Name: "Coles", Price: 0.5 },
          { SupermarketID: 2, Name: "Woolworths", Price: 0.55 },
          { SupermarketID: 3, Name: "Aldi", Price: 0.52 },
        ],
      },
      {
        ProductID: 2,
        Name: "Banana",
        Description: "Sweet ripe bananas.",
        Category: "Fruit",
        ImageURL: "https://source.unsplash.com/featured/?banana",
        Weight: 120,
        Supermarkets: [
          { SupermarketID: 1, Name: "Coles", Price: 0.3 },
          { SupermarketID: 2, Name: "Woolworths", Price: 0.32 },
          { SupermarketID: 3, Name: "Aldi", Price: 0.31 },
        ],
      },
      {
        ProductID: 3,
        Name: "Cherry",
        Description: "Juicy red cherries.",
        Category: "Fruit",
        ImageURL: "https://source.unsplash.com/featured/?cherry",
        Weight: 10,
        Supermarkets: [
          { SupermarketID: 1, Name: "Coles", Price: 0.9 },
          { SupermarketID: 2, Name: "Woolworths", Price: 1.0 },
          { SupermarketID: 3, Name: "Aldi", Price: 0.95 },
        ],
      },
    ];

    render(<Gallery products={mockProducts} />);

    expect(screen.getByText(LABEL.PRODUCTS)).toBeInTheDocument();
  });
});
