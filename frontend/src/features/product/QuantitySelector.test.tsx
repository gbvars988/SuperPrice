import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantitySelector from "./QuantitySelector";

describe("<QuantitySelector />", () => {
  it("renders correctly with initial quantity", () => {
    render(<QuantitySelector quantity={5} setQuantity={() => {}} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-btn-minus")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-btn-plus")).toBeInTheDocument();
  });

  it("increases quantity when plus button is clicked", () => {
    const setQuantity = jest.fn();

    render(<QuantitySelector quantity={1} setQuantity={setQuantity} />);

    fireEvent.click(screen.getByTestId("quantity-btn-plus"));

    expect(setQuantity).toHaveBeenCalledWith(2);
  });

  it("decreases quantity when minus button is clicked but not below 1", () => {
    const setQuantity = jest.fn();

    render(<QuantitySelector quantity={1} setQuantity={setQuantity} />);

    fireEvent.click(screen.getByTestId("quantity-btn-minus"));

    // Expect not to call setQuantity because the quantity is 1
    expect(setQuantity).not.toHaveBeenCalled();
  });

  it("decreases quantity when minus button is clicked if above 1", () => {
    const setQuantity = jest.fn();

    render(<QuantitySelector quantity={5} setQuantity={setQuantity} />);

    fireEvent.click(screen.getByTestId("quantity-btn-minus"));

    expect(setQuantity).toHaveBeenCalledWith(4);
  });
});
