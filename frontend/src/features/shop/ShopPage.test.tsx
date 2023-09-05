import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import ShopPage from "./ShopPage";
import { LABEL } from "../../language";

// mock axios to prevent API calls
jest.mock("axios");

describe("<ShopPage />", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  it("renders the shop page correctly", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: [],
    });

    render(<ShopPage />);

    // check if all the elements are rendered
    const shopHeader = screen.getByText(LABEL.SHOP);
    expect(shopHeader).toBeInTheDocument();

    const filterHeader = screen.getByText(LABEL.FILTER);
    expect(filterHeader).toBeInTheDocument();

    const productsHeader = screen.getByText(LABEL.PRODUCTS);
    expect(productsHeader).toBeInTheDocument();
  });
  // TODO: add more tests for added functionality later
});
