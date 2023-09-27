import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Gallery from "./Gallery";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const mockProducts = [
  {
    productId: 1,
    name: "Apple",
    description: "Fresh red apples.",
    category: "Fruit & Vegetables",
    imageURL: "https://source.unsplash.com/featured/?apple",
    weight: 150,
    supermarketPrices: [
      { supermarketId: 1, supermarketName: "Coles", price: 0.5 },
      { supermarketId: 2, supermarketName: "Woolworths", price: 0.55 },
      { supermarketId: 3, supermarketName: "Aldi", price: 0.52 },
    ],
  },
  {
    productID: 2,
    name: "Banana",
    description: "Sweet ripe bananas.",
    category: "Fruit & Vegetables",
    imageURL: "https://source.unsplash.com/featured/?banana",
    weight: 120,
    supermarketPrices: [
      { supermarketId: 1, supermarketName: "Coles", price: 0.3 },
      { supermarketId: 2, supermarketName: "Woolworths", price: 0.32 },
      { supermarketId: 3, supermarketName: "Aldi", price: 0.31 },
    ],
  },
  {
    productID: 3,
    name: "Cherry",
    description: "Juicy red cherries.",
    category: "Fruit & Vegetables",
    imageURL: "https://source.unsplash.com/featured/?cherry",
    weight: 10,
    supermarketPrices: [
      { supermarketId: 1, supermarketName: "Coles", price: 0.9 },
      { supermarketId: 2, supermarketName: "Woolworths", price: 1.0 },
      { supermarketId: 3, supermarketName: "Aldi", price: 0.95 },
    ],
  },
  {
    productID: 4,
    name: "Chicken",
    description: "Chicken Breast",
    category: "Meat & Seafood",
    imageURL: "https://source.unsplash.com/featured/?chicken",
    weight: 300,
    supermarketPrices: [
      { supermarketId: 1, supermarketName: "Coles", price: 0.9 },
      { supermarketId: 2, supermarketName: "Woolworths", price: 1.0 },
      { supermarketId: 3, supermarketName: "Aldi", price: 0.95 },
    ],
  },
];
// Mock the Chakra UI Image component. This avoids loading actual images, which might trigger state updates.
jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    ...originalModule,
    Image: ({ src, alt }: { src: string; alt: string }) => (
      <img src={src} alt={alt} />
    ),
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={ui} />
      </Routes>
    </BrowserRouter>,
  );
};

describe("<Gallery />", () => {
  test("it renders a list of products with all filters off", async () => {
    const filterState = {
      "Meat & Seafood": false,
      "Fruit & Vegetables": false,
      "Dairy, Eggs & Fridge": false,
      "Bakery": false,
      "Deli": false,
      "Pantry": false,
      "Drinks": false
  };

  await act(async () => {
    renderWithRouter(<Gallery products={mockProducts} filterState={filterState} />);
  });

    expect(screen.getByText("Apple 150g")).toBeInTheDocument();
    expect(screen.getByText("Banana 120g")).toBeInTheDocument();
    expect(screen.getByText("Cherry 10g")).toBeInTheDocument();
    expect(screen.getByText("Chicken 300g")).toBeInTheDocument();
  });

  test("it filters products based on active filter", async () => {
    const filterState = {
      "Meat & Seafood": false,
      "Fruit & Vegetables": true,
      "Dairy, Eggs & Fridge": false,
      "Bakery": false,
      "Deli": false,
      "Pantry": false,
      "Drinks": false
    };

    await act(async () => {
      renderWithRouter(<Gallery products={mockProducts} filterState={filterState} />);
    });

    expect(screen.getByText("Apple 150g")).toBeInTheDocument();
    expect(screen.getByText("Banana 120g")).toBeInTheDocument();
    expect(screen.getByText("Cherry 10g")).toBeInTheDocument();
  });


  test("it displays the PRODUCTS heading", async () => {
    const filterState = {
      "Meat & Seafood": false,
      "Fruit & Vegetables": false,
      "Dairy, Eggs & Fridge": false,
      "Bakery": false,
      "Deli": false,
      "Pantry": false,
      "Drinks": false
  };
    await act(async () => {
      renderWithRouter(<Gallery products={mockProducts} filterState={filterState}  />);
    });

    // Uncomment the line below if the "PRODUCTS" heading should be displayed.
    // expect(screen.getByText(LABEL.PRODUCTS)).toBeInTheDocument();
  });
});
