import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Gallery from "./Gallery";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LABEL } from "../../language";
import SortOptions from "./SortOptions";

type product = {
  productID: string;
  name: string;
  weight: number;
  imageURL: string;
  supermarketPrices: {
    supermarketId: number;
    supermarketName: string;
    price: number;
  }[];
  category: string;
  description: string;
};

const mockProducts = [
  {
    productID: "1",
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
    productID: "2",
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
    productID: "3",
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
    productID: "4",
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

const defaultFilterState = {
  "Meat & Seafood": false,
  "Fruit & Vegetables": false,
  "Dairy, Eggs & Fridge": false,
  Bakery: false,
  Deli: false,
  Pantry: false,
  Drinks: false,
};

const defaultSortState = LABEL.SORT;

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
    await act(async () => {
      renderWithRouter(
        <Gallery
          products={mockProducts}
          filterState={defaultFilterState}
          sortState={defaultSortState}
        />,
      );
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
      Bakery: false,
      Deli: false,
      Pantry: false,
      Drinks: false,
    };

    await act(async () => {
      renderWithRouter(
        <Gallery
          products={mockProducts}
          filterState={filterState}
          sortState={defaultSortState}
        />,
      );
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
      Bakery: false,
      Deli: false,
      Pantry: false,
      Drinks: false,
    };
    await act(async () => {
      renderWithRouter(
        <Gallery
          products={mockProducts}
          filterState={filterState}
          sortState={defaultSortState}
        />,
      );
    });
  });

  test("it sorts products based on name descending", async () => {
    await act(async () => {
      renderWithRouter(
        <Gallery
          products={mockProducts}
          filterState={defaultFilterState}
          sortState={SortOptions.NAME_DESC}
        />,
      );
    });

    const productElements = screen.getAllByText(/g$/);
    const productNames = productElements.map(
      (element) => element.textContent?.split(" ")[0],
    );

    const expectedOrder = [...mockProducts]
      .sort((a, b) => b.name.localeCompare(a.name))
      .map((product) => product.name);

    expect(productNames).toEqual(expectedOrder);
  });

  test("it sorts products based on name ascending", async () => {
    await act(async () => {
      renderWithRouter(
        <Gallery
          products={mockProducts}
          filterState={defaultFilterState}
          sortState={SortOptions.NAME_ASC}
        />,
      );
    });

    const productElements = screen.getAllByText(/g$/);
    const productNames = productElements.map(
      (element) => element.textContent?.split(" ")[0],
    );

    const expectedOrder = [...mockProducts]
      .sort((b, a) => b.name.localeCompare(a.name))
      .map((product) => product.name);

    expect(productNames).toEqual(expectedOrder);
  });

  test("it only sorts fruit and vegetables based on price ascending", async () => {
    const filterState = {
      "Meat & Seafood": false,
      "Fruit & Vegetables": true,
      "Dairy, Eggs & Fridge": false,
      Bakery: false,
      Deli: false,
      Pantry: false,
      Drinks: false,
    };
    await act(async () => {
      renderWithRouter(
        <Gallery
          products={mockProducts}
          filterState={filterState}
          sortState={SortOptions.PRICE_ASC}
        />,
      );
    });

    const productElements = screen.getAllByText(/g$/);
    const productNames = productElements.map(
      (element) => element.textContent?.split(" ")[0],
    );

    const getCheapestPrice = (product: product) => {
      return Math.min(...product.supermarketPrices.map((p) => p.price));
    };

    const expectedOrder = [...mockProducts]
      .filter((product) => product.category === "Fruit & Vegetables")
      .sort((a, b) => getCheapestPrice(a) - getCheapestPrice(b))
      .map((product) => product.name);

    expect(productNames).toEqual(expectedOrder);
  });
});
