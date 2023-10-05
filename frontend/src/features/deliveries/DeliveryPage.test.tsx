import React from "react";
import { act, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import DeliveriesPage from "./DeliveryPage";

jest.mock("axios");

test("renders DeliveriesPage and displays deliveries", async () => {
  // @ts-ignore
  const mockDeliveryIds = [];

  // @ts-ignore
  axios.get.mockResolvedValueOnce({ data: mockDeliveryIds });

  const userMock = { email: "test@example.com" };

  await act(async () => {
    render(
      // @ts-ignore
      <UserContext.Provider value={{ user: userMock }}>
        <Router>
          <DeliveriesPage />
        </Router>
      </UserContext.Provider>,
    );
  });

  const heading = screen.getByRole("heading", { name: "Your Deliveries" });
  expect(heading).toBeInTheDocument();
});
