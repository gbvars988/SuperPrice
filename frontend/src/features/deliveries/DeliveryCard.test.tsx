import React from "react";
import { act, render, screen } from "@testing-library/react";
import axios from "axios";
import DeliveryCard from "./DeliveryCard";

jest.mock("axios");

test("renders DeliveryCard with delivery details", async () => {
  const mockDelivery = {
    data: {
      orderId: 1,
      address: "123 Maple St",
      email: "test@example.com",
      timeSlotId: 2,
      deliveryStatus: "Delivered",
    },
  };

  const mockTimeslot = {
    data: {
      startTime: "09:00",
      endTime: "17:00",
    },
  };

  // @ts-ignore
  axios.get
    .mockResolvedValueOnce(mockDelivery)
    .mockResolvedValueOnce(mockTimeslot);

  await act(async () => {
    render(<DeliveryCard orderId={1} />);
  });

  // check if the UI renders the fetched data
  expect(screen.getByText(/Order ID:/i)).toBeInTheDocument();
  expect(screen.getByText(/123 Maple St/i)).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/09:00 - 17:00/i)).toBeInTheDocument();
  expect(screen.getByText(/Delivered/i)).toBeInTheDocument();
});
