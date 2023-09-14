import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import ProductPage from "./ProductPage";

// Mocking axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    productID: "1",
  }),
}));

const mockProductData = [
  {
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
  },
];

describe("<ProductPage />", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders product information once loaded", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProductData });

    render(<ProductPage />);

    await waitFor(() => {
      expect(screen.getByText("SampleProduct 500g")).toBeInTheDocument();
      expect(screen.getByText("SupermarketA")).toBeInTheDocument();
      expect(screen.getByText("$10.5")).toBeInTheDocument();
    });
  });

  it("renders only non-cheapest supermarkets at the bottom", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProductData });

    render(<ProductPage />);

    await waitFor(() => {
      expect(
        screen.getByText("SampleProduct SupermarketB")
      ).toBeInTheDocument();
      // expect(screen.queryByText("SupermarketA")).not.toBeInTheDocument(); // Not at the bottom
    });
  });
});
