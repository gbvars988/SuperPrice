import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LABEL, PATH } from "../../language";
import CheckoutForm from "./CheckoutForm";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={ui} />
        <Route path={PATH.PAYMENT} element={<div>Payment Page</div>} />
      </Routes>
    </BrowserRouter>,
  );
};

test("renders the checkout form correctly", () => {
  renderWithRouter(<CheckoutForm />);

  // check that all labels and inputs are rendered
  const firstNameLabel = screen.getByText(LABEL.FIRST_NAME);
  expect(firstNameLabel).toBeInTheDocument();
  const lastNameLabel = screen.getByText(LABEL.LAST_NAME);
  expect(lastNameLabel).toBeInTheDocument();
  const emailLabel = screen.getByText(LABEL.EMAIL);
  expect(emailLabel).toBeInTheDocument();
  const addressLabel = screen.getByText(LABEL.ADDRESS);
  expect(addressLabel).toBeInTheDocument();
  const phoneNumberLabel = screen.getByText(LABEL.PHONE_NUMBER);
  expect(phoneNumberLabel).toBeInTheDocument();
  const deliveryOptionsLabel = screen.getByText(LABEL.DELIVERY_OPTIONS);
  expect(deliveryOptionsLabel).toBeInTheDocument();

  const proceedButton = screen.getByRole("button", {
    name: LABEL.PROCEED_TO_PAYMENT,
  });
  expect(proceedButton).toBeInTheDocument();
  expect(proceedButton).toBeDisabled();
});

test("input validation and navigation to payment page", async () => {
  renderWithRouter(<CheckoutForm />);

  const firstNameInput = screen.getByPlaceholderText("John");
  const lastNameInput = screen.getByPlaceholderText("Doe");
  const emailInput = screen.getByPlaceholderText("johndoe@example.com");
  const addressInput = screen.getByPlaceholderText(
    "1 Bourke St, Melbourne VIC 3000",
  );
  const phoneInput = screen.getByPlaceholderText("+61 463 872 474");
  const standardOption = screen.getByText("Standard");

  await act(async () => {
    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(emailInput, "johndoe@example.com");
    await userEvent.type(addressInput, "1 Bourke St, Melbourne VIC 3000");
    await userEvent.type(phoneInput, "+61463872474");
    await userEvent.click(standardOption);
  });

  const proceedButton = screen.getByRole("button", {
    name: LABEL.PROCEED_TO_PAYMENT,
  });

  await act(async () => {
    await userEvent.click(proceedButton);
  });

  expect(screen.getByText("Payment Page")).toBeInTheDocument();
});
