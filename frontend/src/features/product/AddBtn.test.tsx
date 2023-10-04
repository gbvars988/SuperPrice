import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddBtn from "./AddBtn"; // Path to your component file
import { LABEL } from "../../language/index";

describe("<AddBtn />", () => {
  it("renders the button with correct text", () => {
    render(<AddBtn onClick={() => {}} />);

    const buttonElement = screen.getByText(LABEL.ADD_TO_TROLLEY);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick prop when clicked", () => {
    // Mock function to simulate onClick
    const handleClick = jest.fn();

    render(<AddBtn onClick={handleClick} />);

    // Simulate a button click
    fireEvent.click(screen.getByText(LABEL.ADD_TO_TROLLEY));

    // Ensure our mock function was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
