import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import { CartContext, CartContextType } from "../../context/CartContext";

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

type MockCartProviderProps = {
  value: CartContextType;
  children: React.ReactNode;
};

const MockCartProvider: React.FC<MockCartProviderProps> = ({
  value,
  children,
}) => {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

test("renders the payment form correctly", () => {
  const dummyData: CartContextType = {
    cartItems: [],
    checkoutInfo: {
      fullName: "Dummy Name",
      email: "dummy@email.com",
      address: "Dummy Address",
      phone: "123-456-7890",
      deliveryOption: "Standard",
      deliveryTime: "09:00 - 10:00",
    },
    setCheckoutInfo: jest.fn(),
    addToCart: jest.fn(),
    increaseProductQty: jest.fn(),
    decreaseProductQty: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  };

  renderWithRouter(
    <MockCartProvider value={dummyData}>
      <PaymentForm />
    </MockCartProvider>,
  );

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
  const dummyData: CartContextType = {
    cartItems: [],
    checkoutInfo: {
      fullName: "Dummy Name",
      email: "dummy@email.com",
      address: "Dummy Address",
      phone: "123-456-7890",
      deliveryOption: "Standard",
      deliveryTime: "09:00 - 10:00",
    },
    setCheckoutInfo: jest.fn(),
    addToCart: jest.fn(),
    increaseProductQty: jest.fn(),
    decreaseProductQty: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  };

  renderWithRouter(
    <MockCartProvider value={dummyData}>
      <PaymentForm />
    </MockCartProvider>,
  );

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
