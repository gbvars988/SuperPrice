import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeliveriesPage from "./DeliveryPage";

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

test("renders DeliveriesPage without crashing", () => {
  renderWithRouter(<DeliveriesPage />);

  const heading = screen.getByRole("heading", { name: "Your Deliveries" });
  expect(heading).toBeInTheDocument();
});
