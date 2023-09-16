import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
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

// const mockProductData = [
//   {
//     productID: "1",
//     name: "SampleProduct",
//     weight: 500,
//     imageURL: "http://sampleurl.com/image.jpg",
//     supermarketPrices: [
//       {
//         supermarketId: 1,
//         supermarketName: "SupermarketA",
//         price: 10.5,
//       },
//       {
//         supermarketId: 2,
//         supermarketName: "SupermarketB",
//         price: 12,
//       },
//     ],
//   },
// ];

const mockProductData = [
  {
    supermarketId: 1,
    productId: "1",
    price: 10.5,
    supermarket: {
      supermarketId: 1,
      name: "SupermarketA",
    },
    product: {
      productId: 1,
      name: "SampleProduct",
      description: "SampleDescription",
      category: "SampleCategory",
      imageURL: "http://sampleurl.com/image.jpg",
      weight: 500,
    },
  },
  {
    supermarketId: 2,
    productId: "1",
    price: 12,
    supermarket: {
      supermarketId: 2,
      name: "SupermarketB",
    },
    product: {
      productId: 1,
      name: "SampleProduct",
      description: "SampleDescription",
      category: "SampleCategory",
      imageURL: "http://sampleurl.com/image.jpg",
      weight: 500,
    },
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
      const sampleProducts = screen.queryAllByText("SampleProduct 500g");
      expect(sampleProducts).toHaveLength(2);

      expect(screen.getByText("SupermarketA")).toBeInTheDocument();

      expect(screen.getByText("$10.5")).toBeInTheDocument();
    });
  });
});