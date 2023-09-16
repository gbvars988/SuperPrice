import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "./SearchBar";

describe("<SearchBar />", () => {
    it("renders correctly with initial value", () => {
        render(<SearchBar keyword="initialValue" onChange={() => {}} />);

        const input = screen.getByPlaceholderText("Search products");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("initialValue");
    });

    it("calls the onChange handler when the input value changes", () => {
        const mockOnChange = jest.fn();
        render(<SearchBar keyword="" onChange={mockOnChange} />);

        const input = screen.getByPlaceholderText("Search products");
        fireEvent.change(input, { target: { value: "new value" } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith("new value");
    });
});