import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ReviewForm from "./ReviewForm";
describe("ReviewForm", () => {
  // Mock the onSubmit function
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders the form fields correctly", () => {
    render(<ReviewForm onSubmit={mockOnSubmit} />);

    // Assert that the Name and Review fields are present
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });
});
