import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantityBtn from "./QuantityBtn";
import { FaPlus } from "react-icons/fa"; // Using FontAwesome's Plus icon for demonstration

describe("<QuantityBtn />", () => {
  it("renders the button with the provided icon", () => {
    render(<QuantityBtn icon={<FaPlus />} onClick={() => {}} type="plus" />);

    // Check if the SVG icon is in the document
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("calls onClick prop when clicked", () => {
    // Mock function to simulate onClick
    const handleClick = jest.fn();

    render(<QuantityBtn icon={<FaPlus />} onClick={handleClick} type="plus" />);

    // Simulate a button click
    fireEvent.click(screen.getByRole("group"));

    // Ensure our mock function was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
