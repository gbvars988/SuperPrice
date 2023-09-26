import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={ui} />
        <Route path={"/home"} element={<div>Home Page</div>} />
      </Routes>
    </BrowserRouter>,
  );
};

test("renders the payment form correctly", () => {
  renderWithRouter(<PaymentForm />);

  // check that all labels and inputs are rendered
  const nameInput = screen.getByPlaceholderText("John Doe");
  expect(nameInput).toBeInTheDocument();

  const cardNumberInput = screen.getByPlaceholderText("1234 5678 9123 4567");
  expect(cardNumberInput).toBeInTheDocument();

  const validThruInput = screen.getByPlaceholderText("08/25");
  expect(validThruInput).toBeInTheDocument();

  const cvvInput = screen.getByPlaceholderText("123");
  expect(cvvInput).toBeInTheDocument();

  const confirmPaymentButton = screen.getByRole("button", {
    name: "Confirm Payment",
  });
  expect(confirmPaymentButton).toBeInTheDocument();
  expect(confirmPaymentButton).toBeDisabled();
});

test("input validation and successful form submission", async () => {
  renderWithRouter(<PaymentForm />);

  const nameInput = screen.getByPlaceholderText("John Doe");
  const cardNumberInput = screen.getByPlaceholderText("1234 5678 9123 4567");
  const validThruInput = screen.getByPlaceholderText("08/25");
  const cvvInput = screen.getByPlaceholderText("123");

  await act(async () => {
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(cardNumberInput, "1234567891234567");
    await userEvent.type(validThruInput, "08/25");
    await userEvent.type(cvvInput, "123");
  });

  const confirmPaymentButton = screen.getByText("Confirm Payment");

  await act(async () => {
    await userEvent.click(confirmPaymentButton);
  });
});
